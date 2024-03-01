// // AuthContext.js
// import React, { createContext, useContext, useState } from 'react';  // Asegúrate de importar useContext desde 'react'
// import PropTypes from 'prop-types';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); 
  const isAuthenticated = !!user; 

  const login = (userData) => {
    setUser(userData);
  
    let role = null;
  
    if (userData.email && userData.email.toLowerCase().includes('@admin')) {
      role = 'admin';
    }
  
    setUserRole(role);
  
    localStorage.setItem('userData', JSON.stringify({ ...userData, role }));
  };

  const logout = () => {
    setUser(null);
    setUserRole(null); 
    localStorage.removeItem('userData');
  
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};

