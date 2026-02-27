// src/components/Common/GlobalLoader.js
import React from 'react';
import { RefreshCw } from 'lucide-react';
import '../../styles/GlobalLoader.css';

const GlobalLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="global-loader-overlay">
      <div className="global-loader-content">
        <div className="loader-spinner">
          <RefreshCw size={48} className="spinning" />
        </div>
        <p className="loader-message">{message}</p>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;