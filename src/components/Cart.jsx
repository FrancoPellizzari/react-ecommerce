import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css'; 

const Carrito = () => {
  const { clearCart } = useContext(CartContext);
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div>
        <h2>Carrito de Compras</h2>
        <p>El carrito está vacío.</p>
      </div>
    );
  }

  
  const productQuantities = {};

  
  cart.forEach((item) => {
    if (productQuantities[item.id]) {
      productQuantities[item.id].quantity += item.quantity;
    } else {
      productQuantities[item.id] = {
        ...item,
        quantity: item.quantity,
      };
    }
  });

   

  const handleCheckout = () => {
    alert('Se redirigirá a la pasarela de pago');
    clearCart();
  };

  const handleClearCart = () => {
    clearCart();
  };


  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul className="cart-list">
        {Object.values(productQuantities).map((item) => (
          <li key={item.id} className="cart-item">
            <div className="cart-item-details">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio total: ${item.price * item.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Finalizar Compra</button>
      <button onClick={handleClearCart}>Eliminar Todos</button>
    </div>
  );
};

export default Carrito;
