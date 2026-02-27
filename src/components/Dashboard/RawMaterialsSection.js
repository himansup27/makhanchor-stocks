// src/components/Dashboard/RawMaterialsSection.js - WITH DATE RANGE LABEL
import React from 'react';
import { Wheat, Candy, Box, Flame } from 'lucide-react';

const RawMaterialsSection = ({ rawMaterials, dateRange }) => {
  const getDateRangeLabel = () => {
    const labels = {
      today: 'Today',
      yesterday: 'Yesterday',
      last7days: 'Last 7 Days',
      last30days: 'Last 30 Days',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      custom: 'Selected Range',
    };
    return labels[dateRange] || 'Selected Range';
  };

  return (
    <div className="raw-materials-section">
      <h3 className="section-title">
        Raw Materials Purchased
        <span className="date-range-badge">{getDateRangeLabel()}</span>
      </h3>
      <div className="materials-list">
        <MaterialRow
          icon={Wheat}
          name="Suji"
          value={rawMaterials.suji}
          unit="packets"
          color="#eab308"
        />
        <MaterialRow
          icon={Candy}
          name="Sugar"
          value={rawMaterials.sugar}
          unit="packets"
          color="#ec4899"
        />
        <MaterialRow
          icon={Box}
          name="Salt"
          value={rawMaterials.salt}
          unit="packets"
          color="#a0a0a0"
        />
        <MaterialRow
          icon={Flame}
          name="Gas (Big)"
          value={rawMaterials.gasBig}
          unit="tanks"
          color="#ef4444"
        />
        <MaterialRow
          icon={Flame}
          name="Gas (Small)"
          value={rawMaterials.gasSmall}
          unit="tanks"
          color="#f87171"
        />
      </div>
    </div>
  );
};

const MaterialRow = ({ icon: Icon, name, value, unit, color }) => {
  return (
    <div className="material-row">
      <div className="material-info">
        <Icon size={20} style={{ color }} />
        <span className="material-name">{name}</span>
      </div>
      <div className="material-value">
        <span className="value">{value}</span>
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
};

export default RawMaterialsSection;