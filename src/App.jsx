import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carrito from './components/Cart';
import data from './data/dbcopy.json';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import LoginForm from './components/LoginForm';
import { AuthProvider } from './context/AuthContext';
import ProductSection from './components/ProductSection';
import Banner from './components/Banner';
import Layout from './views/Layout';
import ProductDetails from './components/ProductDetails';
import ProtectedRoute from './components/ProtectedRoutes'; 
import NotFound from './views/NotFound';
import Modal from './components/Modal'; // Importa el componente Modal
import useModal from './useModal.jsx';
import useApi from './useApi.jsx';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data.products); 
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('products');
  
  const [editedProduct, setEditedProduct] = useState({ id: null, title: "", price: "" });
  const { isOpen, openModal, closeModal } = useModal();
  const {products, deleteProduct, createProduct, editProduct} = useApi(); 

  useEffect(() => {
   
    setFilteredProducts(data.products);
  }, []);

  
  const handleEdit = (product) => {
    // Llama a la función que establecerá el producto editado en el hook
    setEditedProduct(product);
    openModal(); // Puedes usar tu propia lógica para abrir la modal aquí si es necesario
  };

  const handleSave = () => {
    if (editedProduct.id !== null) {
      editProduct(); // Llama a la función para editar el producto
    } else {
      createProduct(); // Llama a la función para crear un nuevo producto
    }
    closeModal();
  };


  const handleDelete = (id) => {
    deleteProduct(id);
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };


  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    filterProducts(newSearchTerm);
  };

  const filterProducts = (newSearchTerm) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const switchToProductsView = () => {
    setCurrentView('products');
  };

  const switchToCartView = () => {
    setCurrentView('cart');
  };

  const switchToLoginView = () => {
    setCurrentView('login');
  };

  const handleLogin = () => {
    
    console.log("Usuario autenticado con éxito.");
  };

  return (
    <BrowserRouter>
    <ThemeProvider>
      <Layout
        filterProducts={filterProducts}
        switchToCartView={switchToCartView}
        switchToLoginView={switchToLoginView}
      >
        <ThemeProvider>
          <CartProvider>
            <AuthProvider>
              <div>
               
                <Banner />
                <div className="product-list">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        currentView === 'products' && (
                          <ProductSection
                          products= {filteredProducts}
                          
                          addToCart={addToCart}
                          onEdit={(id, title, price) => onEdit(id, title, price)}
                          onDelete={handleDelete}
                        />
                        )
                      }
                    />
                      <Route
                        path="/cart"
                        element={
                          <ProtectedCart>
                            <Carrito />
                          </ProtectedCart>
                        }
                      />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route
                    path="/products/:id"
                    element={
                      <ProductDetails
                        products={data.products}
                        addToCart={addToCart}
                      />
                    }
                  />
                   <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </Layout>
      <Modal
  isOpen={isOpen}
  onClose={closeModal}
  onConfirm={handleSave}
  title="Editar Producto"
  content={
    <>
      <label>
        Título:
        <input
          type="text"
          name="title"
          value={editedProduct?.title || ''}
          onChange={handleInputChange}
        />
      </label>
    </>
  }
/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const ProtectedCart = () => (
  <ProtectedRoute redirectTo="/cart">
    <Carrito />
  </ProtectedRoute>
);

export default App;

