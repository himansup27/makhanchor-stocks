// src/components/Dashboard/DateRangeFilter.js
import React from 'react';
import { Calendar } from 'lucide-react';
import '../../styles/DateRangeFilter.css';

const DateRangeFilter = ({
  dateRange,
  setDateRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showDatePicker,
  setShowDatePicker,
}) => {
  const options = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: '7 Days' },
    { value: 'last30days', label: '30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom' },
  ];

  return (
    <div className="date-filter">
      <div className="date-filter-header">
        <Calendar size={18} />
        <span>Date Range</span>
      </div>

      <div className="date-filter-options">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setDateRange(option.value);
              if (option.value === 'custom') {
                setShowDatePicker(true);
              } else {
                setShowDatePicker(false);
              }
            }}
            className={`filter-option ${dateRange === option.value ? 'active' : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {showDatePicker && dateRange === 'custom' && (
        <div className="custom-date-picker">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
          <span className="date-separator">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;