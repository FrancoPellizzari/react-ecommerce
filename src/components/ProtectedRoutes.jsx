// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

// function ProtectedRoute({ element, redirectTo = '/login' }) {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? (
//     <Route element={element} />
//   ) : (
//     <Navigate to={redirectTo} />
//   );
// }

// ProtectedRoute.propTypes = {
//   element: PropTypes.node.isRequired,
//   redirectTo: PropTypes.string,
// };

// export default ProtectedRoute;

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;