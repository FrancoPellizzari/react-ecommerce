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

const ProductSection = ({ filteredProducts, addToCart, onEdit, onDelete }) => {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <>
      {filteredProducts.map((product) => (
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
  filteredProducts: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,   
  onDelete: PropTypes.func.isRequired, 

};

const handleEdit = (productId) => {
  console.log(`Editar producto con ID: ${productId}`);
};

const handleDelete = (productId) => {
  console.log(`Eliminar producto con ID: ${productId}`);
};

export default ProductSection;
