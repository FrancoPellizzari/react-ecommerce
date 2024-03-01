import React from "react";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
import Footer from "../components/Footer";

const Layout = ({ children, filterProducts, switchToCartView, switchToLoginView }) => {
  return (
    <div>
      <Navbar
        onSearchSubmit={filterProducts}
        switchToCartView={switchToCartView}
        switchToLoginView={switchToLoginView}
      />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  filterProducts: PropTypes.func.isRequired,
  switchToCartView: PropTypes.func.isRequired,
  switchToLoginView: PropTypes.func.isRequired,
};

export default Layout;
