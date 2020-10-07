import React from 'react';
import './Button.css';

function Button({ className, onClick, title, children }) {
  return (
    <button type='button' className={`btn ${className}`} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

export default Button;
