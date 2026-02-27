// src/components/Dashboard/TopCustomersSection.js
import React from 'react';
import { Users } from 'lucide-react';

const TopCustomersSection = ({ customers }) => {
  if (!customers || customers.length === 0) {
    return (
      <div className="top-customers-section glass-card">
        <h3 className="section-title">
          <Users size={20} />
          Top 5 Customers
        </h3>
        <p className="empty-state">No customer data available</p>
      </div>
    );
  }

  const maxDabbas = customers[0]?.dabbas || 1;

  return (
    <div className="top-customers-section glass-card">
      <h3 className="section-title">
        <Users size={20} />
        Top 5 Customers
      </h3>
      <div className="customers-list">
        {customers.map((customer, index) => (
          <div key={index} className="customer-item">
            <div className="customer-rank">{index + 1}</div>
            <div className="customer-details">
              <div className="customer-header">
                <span className="customer-name">{customer.name}</span>
                <span className="customer-packets">
                  {customer.packets.toFixed(1)} packets
                </span>
              </div>
              <div className="customer-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(customer.dabbas / maxDabbas) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="customer-dabbas">{customer.dabbas} dabbas</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCustomersSection;