// src/components/Dashboard/StatsGrid.js
import React from 'react';
import { Package, ShoppingCart } from 'lucide-react';

const StatsGrid = ({ production, sales }) => {
  return (
    <div className="stats-grid">
      <StatCard
        icon={Package}
        title="Production"
        value={production}
        subtitle="packets produced"
        color="gold"
      />
      <StatCard
        icon={ShoppingCart}
        title="Sales"
        value={sales}
        subtitle="packets sold"
        color="green"
      />
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
  const colorStyles = {
    gold: {
      iconBg: 'rgba(212, 175, 55, 0.1)',
      iconColor: '#D4AF37',
      valueColor: '#FFD700',
    },
    green: {
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981',
      valueColor: '#10b981',
    },
  };

  const style = colorStyles[color];

  return (
    <div className="stat-card glass-card">
      <div className="stat-header">
        <div
          className="stat-icon"
          style={{ background: style.iconBg }}
        >
          <Icon size={24} style={{ color: style.iconColor }} />
        </div>
        <span className="stat-title">{title}</span>
      </div>
      <div className="stat-value" style={{ color: style.valueColor }}>
        {value}
      </div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
};

export default StatsGrid;