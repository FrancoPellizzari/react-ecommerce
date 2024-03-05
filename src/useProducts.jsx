import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/reducers/productsReducer.js";
import {
  addProductThunk,
  updateProductThunk,
} from "../redux/reducers/productsReducer";

export default function useProducts() {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [form, setForm] = useState({
    price: "",
    title: "",
    description: "",
  });

  // Función que se ejecuta en el formulario del modal - onSubmit
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (modalType === "new") {
      const newProduct = {
        id: uuidv4(),
        title: form.title,
        price: form.price,
        description: form.description,
        image: "https://via.placeholder.com/150/92c952",
      };

      try {
        dispatch(addProductThunk(newProduct));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating product", error);
      }
    }

    if (modalType === "edit") {
      const findProduct = products?.find(
        (product) => product.id.toString() === form.id.toString()
      );
      const editedProduct = {
        ...findProduct,
        title: form.title,
        price: form.price,
        description: form.description,
      };
      try {
        dispatch(updateProductThunk(editedProduct));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating product", error);
      }
    }
  };

  const openEditProductModal = (id) => {
    const filteredProduct = products?.filter(
      (product) => product.id.toString() === id.toString()
    );
    setForm({
      price: filteredProduct[0].price,
      title: filteredProduct[0].title,
      description: filteredProduct[0].description,
      id: filteredProduct[0].id,
    });
    setIsModalOpen(true);
  };

  return {
    form,
    setForm,
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    openEditProductModal,
    handleSubmitForm,
  };
}