import React from 'react';
import './ButtonGroup.css';

function ButtonGroup({ className, children }) {
  return <div className={`btn-group ${className}`}>{children}</div>;
}

export default ButtonGroup;
