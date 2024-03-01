import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

const Banner = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="banner">
      {user ? (
        <p>{`¡${user.name}, aprovéchate de tu 20% de descuento!`}</p>
      ) : (
        <p>Crea una cuenta para disfrutar de nuestros descuentos.</p>
      )}
    </div>
  );
};

export default Banner;
