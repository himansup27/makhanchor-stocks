// src/components/Dashboard/InventorySection.js
import React from 'react';
import { Wheat, Droplet, Cookie, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const InventorySection = ({ inventory }) => {
  return (
    <div className="inventory-section">
      <h3 className="section-title">Inventory Status</h3>
      <div className="inventory-grid">
        <InventoryCard
          icon={Wheat}
          name="Maida"
          currentStock={inventory.maida.currentStock}
          imported={inventory.maida.imported}
          consumed={inventory.maida.consumed}
          unit="packets"
          color="#f59e0b"
        />
        <InventoryCard
          icon={Droplet}
          name="Oil"
          currentStock={inventory.oil.currentStock}
          imported={inventory.oil.imported}
          consumed={inventory.oil.consumed}
          unit="tins"
          color="#eab308"
        />
        <InventoryCard
          icon={Cookie}
          name="Ghee"
          currentStock={inventory.ghee.currentStock}
          imported={inventory.ghee.imported}
          consumed={inventory.ghee.consumed}
          unit="dabba"
          color="#f97316"
        />
      </div>
    </div>
  );
};

const InventoryCard = ({ icon: Icon, name, currentStock, imported, consumed, unit, color }) => {
  return (
    <div className="inventory-card glass-card">
      <div className="inventory-header">
        <Icon size={24} style={{ color }} />
        <span className="inventory-name">{name}</span>
      </div>
      
      <div className="inventory-stock">
        <div className="stock-label">Current Stock</div>
        <div className="stock-value" style={{ color }}>
          {currentStock} {unit}
        </div>
      </div>

      <div className="inventory-details">
        <div className="detail-row">
          <div className="detail-label">
            <ArrowUpCircle size={14} style={{ color: '#10b981' }} />
            <span>Imported</span>
          </div>
          <div className="detail-value" style={{ color: '#10b981' }}>
            {imported} {unit}
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-label">
            <ArrowDownCircle size={14} style={{ color: '#ef4444' }} />
            <span>Consumed</span>
          </div>
          <div className="detail-value" style={{ color: '#ef4444' }}>
            {consumed} {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySection;