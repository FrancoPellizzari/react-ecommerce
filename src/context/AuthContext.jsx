// useAuth.js
import { createContext, useContext, useState, useCallback, useEffect  } from 'react';
import PropTypes from 'prop-types';
export const AuthContext = createContext();

const determineUserRole = (email) => {
  const lowercasedEmail = email.toLowerCase();

  if (lowercasedEmail.includes('@admin')) {
    return 'admin';
  } else if (lowercasedEmail) {
    return 'user';
  } else {
    return 'guest';
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = useCallback((userData) => {
    setUser(userData);
    let role = determineUserRole(userData.email);
    setUserRole(role);
    setIsAuthenticated(true);

    localStorage.setItem('userData', JSON.stringify({ ...userData, role }));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userData');
  }, []);

  useEffect( () =>{
    const storedUser = JSON.parse(localStorage.getItem('userData')); 
    if(storedUser){
      setIsAuthenticated(true)
      setUserRole(storedUser.role)
    } else{
      setIsAuthenticated(false)
    }
  })

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

