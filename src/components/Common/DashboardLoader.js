// src/components/Common/DashboardLoader.js
import React from 'react';
import '../../styles/DashboardLoader.css';

const DashboardLoader = ({ loading, message = 'Updating...' }) => {
  if (!loading) return null;

  return (
    <div className="dashboard-loader-overlay">
      <div className="dashboard-loader-badge">
        <div className="dashboard-loader-spinner" />
        <span className="dashboard-loader-message">{message}</span>
      </div>
    </div>
  );
};

export default DashboardLoader;