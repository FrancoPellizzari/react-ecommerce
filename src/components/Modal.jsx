// Modal.jsx

import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, onConfirm, title, content }) => {
   
    if (!isOpen) {
      return null;
    }
  
    console.log('Modal rendering with content:', content);
  
    return (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{title}</h2>
            {content} {/* Renderizar el contenido directamente sin envolverlo */}
            <button onClick={onClose}>Cancelar</button>
            <button onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      );
  };

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default Modal;
