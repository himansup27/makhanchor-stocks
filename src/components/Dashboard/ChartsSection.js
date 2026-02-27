// src/components/Dashboard/ChartsSection.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ChartsSection = ({ trendData }) => {
  return (
    <div className="charts-section">
      <div className="glass-card chart-container">
        <h3 className="section-title">Production vs Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis
              dataKey="date"
              stroke="#A0A0A0"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#A0A0A0" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '12px',
                color: '#fff',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="production"
              stroke="#D4AF37"
              strokeWidth={3}
              name="Production"
              dot={{ r: 4, fill: '#D4AF37' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={3}
              name="Sales"
              dot={{ r: 4, fill: '#10b981' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;