//CartContext.jsx
import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (element) => {
    
    const existingItem = cart.find((item) => item.id === element.id);

    if (existingItem) {
      
      const updatedCart = cart.map((item) =>
        item.id === element.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
     
      setCart([...cart, { ...element, quantity: 1 }]);
    }
  };
  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  
  }

  CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };