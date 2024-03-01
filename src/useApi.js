// useApi.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from "uuid";

const API_URL = 'http://localhost:3000/products';

const useApi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    title: "",
    price: "",
  })

  const getProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSave = () => {
    if(editedProduct.id !== null){
        editedProduct();
    }else{
        createProduct();
    }
  };

  const createProduct = async () => {
    try {
    
      const newId = uuidv4();
      const newProduct = {...editedProduct, id: newId};
      const response = await axios.post(API_URL, newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setEditedProduct ({id: null, title: "", price: ""});
    } catch (error) {
      console.error("Error agregando el producto: ", error);
    }
  };

  const deleteData = async (id) => {
    // Lógica para eliminar un producto de la API
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const editProduct = async () => {
    try{
        const response = await axios.put(
        `${API_URL}/${editedProduct.id}`,
        editedProduct
        );
        const updatedProduct = response.data;
        setProducts((prevProducts) =>
            prevProducts.map((product)=>
            product.id === updatedProduct.id ? updatedProduct : product
            ) 
        );
        setEditedProduct({id: null, title: "", price: ""});
    } catch (error){
        console.error("Error editando producto: ", error);
    }
  };

  return { getProducts, handleSave, error, editProduct, createProduct, deleteData };
};

export default useApi;
