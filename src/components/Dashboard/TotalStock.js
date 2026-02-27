// src/components/Dashboard/TotalStock.js
import React from 'react';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import '../../styles/TotalStock.css';

const TotalStock = ({ totalStock, production, sales }) => {
  const { isScrolled } = useScrollPosition();

  return (
    <div className={`total-stock-hero`}>
      <div className="stock-label">Total Stock Available</div>
      
      <div className="stock-value-container">
        <Package className="stock-icon" size={32} />
        <div className="stock-value">{totalStock}</div>
        <div className="stock-unit">packets</div>
      </div>

      <div className="stock-details">
        <div className="stock-detail-item">
          <span className="detail-label">All Time Production</span>
          <span className="detail-value">{production}</span>
        </div>
        <div className="stock-detail-divider"></div>
        <div className="stock-detail-item">
          <span className="detail-label">All Time Sales</span>
          <span className="detail-value">{sales}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalStock;