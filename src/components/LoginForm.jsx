// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = ({onLogin}) => {
  const { login, logout, isAutenthicated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
     setLoggedIn(!!localStorage.getItem('userData'));
   }, []);

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   const userData = { name, email };
  //   localStorage.setItem('userData', JSON.stringify(userData));
  //   login(userData);
  //   setLoggedIn(true);
  // };


  // const handleLogin = (e) => {
  //   e.preventDefault();
    
  //   const userData = { name, email };
  //   localStorage.setItem('userData', JSON.stringify(userData));
  //   login(userData);
  //   setLoggedIn(true);
  //   onLogin();
  
  //   const { from } = location.state || { from: { pathname: '/' } };
  
    
  //   navigate(from.from || '/cart');
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { name, email };
    
    login(userData);
    onLogin();
    const { from } = location.state || { from: { pathname: '/' } };
    navigate(from.pathname || '/cart');
  };
  
  

  const handleLogout = () => {
    localStorage.removeItem('userData');
    logout();
    setLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Nombre:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Correo:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

export default LoginForm;
