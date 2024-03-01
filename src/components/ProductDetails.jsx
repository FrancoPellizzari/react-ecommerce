import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { useAuth } from '../context/AuthContext';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id, 10));
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();


  console.log("ProductDetails - product:", product);

  if (!product) {
    // Redirigir a la página principal si el producto no se encuentra
    navigate('/');
    // O mostrar un mensaje de error más descriptivo
    return <div>Producto no encontrado</div>;
  }
  // const handleAddToCart = () => {
  //   addToCart(product); 
  // };
  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
    }
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      {isAuthenticated && (
            <button onClick={handleAddToCart}>Agregar al Carrito</button>
          )}
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
