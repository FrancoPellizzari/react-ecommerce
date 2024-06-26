import React, { useContext } from 'react';
import './ProductCard.css';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import useModal from '../useModal.jsx';

const ProductCard = ({ product, onEdit, onDelete, isAuthenticated, userRole }) => {
  const { id, title, price, description, category, image, rating } = product;
  const { isOpen, openModal, closeModal } = useModal();
  const {theme, toggleTheme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  
  
  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      
      console.log("Usuario no autenticado. Redirigiendo a la página de inicio de sesión.");
    }
  };

  // const handleEdit = () => {
  //   onEdit(product);
  // };

  const handleEdit = () => {
    onEdit(id, title, price);
  };

  const handleDelete = () => {
    openModal();
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    closeModal();
  };

  
  return (
    <nav className={`navbar ${theme === 'dark' ? 'dark-card' : 'light-card'}`}>
      <div className="product-card">
        <img src={image} alt={title} className="product-image" />
        <div className="product-details">
          <h3 className="product-title">{title}</h3>
          
          <p className="product-price">${price}</p>
          <p className="product-category">{category}</p>
          <div className="product-rating">
            <p>Rating: {rating.rate} ({rating.count} reviews)</p>
          </div>
          <Link to={`/products/${product.id}`}>Ver Detalles</Link>
          {isAuthenticated && (
            <button onClick={handleAddToCart}>Agregar al Carrito</button>
          )}
          {isAuthenticated && userRole === 'admin' && (
          <>
           <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
          </>
        )}
          
        </div>
        <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        content="¿Estás seguro de que deseas eliminar este producto?"
      />
      </div>
    </nav>
  );
}



export default ProductCard;
