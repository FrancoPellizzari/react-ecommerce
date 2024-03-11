// // LoginForm.jsx
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, useLocation } from 'react-router-dom';

// const LoginForm = ({onLogin}) => {
//   const { login, logout, isAutenthicated } = useAuth();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//    useEffect(() => {
//      setLoggedIn(!!localStorage.getItem('userData'));
//    }, []);

  

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const userData = { name, email };
    
//     login(userData);
//     onLogin();
//     const { from } = location.state || { from: { pathname: '/' } };
//     navigate(from.pathname || '/cart');
//   };
  
  

//   const handleLogout = () => {
//     localStorage.removeItem('userData');
//     logout();
//     setLoggedIn(false);
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <form onSubmit={handleLogin}>
//           <label>
//             Nombre:
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           </label>
//           <label>
//             Correo:
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </label>
//           <button type="submit">Login</button>
//         </form>
//       )}
//     </div>
//   );
// };

// LoginForm.propTypes = {
//   onLogin: PropTypes.func,
//   onLogout: PropTypes.func,
// };

// export default LoginForm;


import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const password = watch("password");
  const passwordRepeat = watch("passwordRepeat");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setLoggedIn(true);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password, passwordRepeat } = data;

    

    

    try {
      await login({ name, email });
      onLogin();

      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from.pathname || '/cart');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('userData');
    logout();
    setLoggedIn(false);
  };
    

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
    <form onSubmit={onSubmit}>
      <label>
        Nombre:
        <input 
        type="text"
        {...register("name", { 
          onBlur: (e) => console.log(e.target.value) })} 
          />
          {errors.name && <span>{errors.name.message}</span>}
      </label>
      <label>
        Correo:
        <input {...register("email", { 
          required: "por favor, registre su email.",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Ingrese un correo electrónico válido',
          },  })} />
                    {errors.email && <span>{errors.email.message}</span>}

      </label>
      <label>
        Contraseña:
        <input {...register("password", { required: true })} type="password" />
      </label>
      <label>
        Repetir Contraseña:
        <input
          {...register("passwordRepeat", {
            required: true,
            validate: (value) => value === password || "Las contraseñas deben coincidir",
          })}
          type="password"
        />
        {errors.passwordRepeat && <span>{errors.passwordRepeat.message}</span>}
      </label>
      {errors.passwordRepeat && <p>Las contraseñas deben coincidir</p>}
      <button type="submit">Login</button>
      
    </form>
    )}
    </div>
  );
};

export default LoginForm;
