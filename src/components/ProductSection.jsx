// import React from 'react';
// import ProductCard from './ProductCard';
// import PropTypes from 'prop-types';

// const ProductSection = ({ filteredProducts, addToCart }) => (
  
//   <>
//     {filteredProducts.map((product) => (
//       <ProductCard key={product.id} product={product} addToCart={addToCart} />
//     ))}
//   </>
// );

// ProductSection.propTypes = {
//     filteredProducts: PropTypes.array.isRequired,
//     addToCart: PropTypes.func.isRequired,
//   };
  

// export default ProductSection;
import React from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

import data from '../data/db.json';

const ProductSection = ({ addToCart, onEdit, onDelete }) => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <>
      {data.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          onEdit={onEdit}
          onDelete={onDelete}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
        />
      ))}
    </>
  );
};

ProductSection.propTypes = {
  addToCart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductSection;