import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';


const Navbar = ({ onSearchSubmit, switchToCartView, switchToLoginView }) => {
  console.log('ThemeContext:', ThemeContext);

  const [searchTerm, setSearchTerm] = useState('');
  const {theme, toggleTheme } = useContext(ThemeContext);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };

 
  

return (
  <nav className={`navbar ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
    <div className="logo">Mi Tienda React</div>
    <form onSubmit={handleSearchSubmit} className="search-form">
      <input
        name='buscador'
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Buscar</button>
    </form>
    <ul className="nav-links">
      <li><NavLink to="/">Inicio</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/cart">Carrito</NavLink></li>
      
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </ul>
  </nav>
);

};

Navbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  switchToCartView: PropTypes.func.isRequired,
  switchToLoginView: PropTypes.func.isRequired
};

export default Navbar;
