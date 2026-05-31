// src/components/Dashboard/TotalStock.js
import React, { useState, useEffect, useRef } from 'react';
import { Package } from 'lucide-react';
import { api } from '../../utils/api';
import { formatDate } from '../../utils/helpers';
import '../../styles/TotalStock.css';

const getFinancialYearRange = () => {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed, so March = 2, April = 3
  const year = now.getFullYear();

  // Financial year starts April 1
  // If current month is Jan (0), Feb (1), Mar (2) → FY started previous year
  const fyStartYear = month < 3 ? year - 1 : year;
  const fyStart = new Date(fyStartYear, 3, 1); // April 1

  return {
    start: formatDate(fyStart),
    end: formatDate(now),
    label: `Apr ${fyStartYear} – Mar ${fyStartYear + 1}`,
  };
};

const TotalStock = ({ totalStock, production: allTimeProduction, sales: allTimeSales }) => {
  const [activeTab, setActiveTab] = useState('fy'); // 'fy' | 'alltime'
  const [fyData, setFyData] = useState(null);
  const [fyLoading, setFyLoading] = useState(true);
  const abortRef = useRef(null);

  useEffect(() => {
    const fetchFYData = async () => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      const { signal } = abortRef.current;

      setFyLoading(true);
      try {
        const { start, end } = getFinancialYearRange();
        const params = { startDate: start, endDate: end };

        const [prodRes, salesRes] = await Promise.all([
          api.get('/production/stats', { params, signal }),
          api.get('/sales/stats', { params, signal }),
        ]);

        if (signal.aborted) return;

        setFyData({
          production: prodRes.data.data.totalProduction || 0,
          sales: salesRes.data.data.totalSales || 0,
        });
      } catch (err) {
        if (err.name === 'AbortError' || err.name === 'CanceledError') return;
        console.error('Failed to fetch FY data for TotalStock:', err);
      } finally {
        if (!abortRef.current?.signal.aborted) {
          setFyLoading(false);
        }
      }
    };

    fetchFYData();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const fyRange = getFinancialYearRange();
  const isAllTime = activeTab === 'alltime';

  const displayProduction = isAllTime ? allTimeProduction : (fyData?.production ?? '—');
  const displaySales = isAllTime ? allTimeSales : (fyData?.sales ?? '—');
  const isLoading = !isAllTime && fyLoading;

  return (
    <div className="total-stock-hero">
      <div className="stock-label">Total Stock Available</div>

      <div className="stock-value-container">
        <Package className="stock-icon" size={32} />
        <div className="stock-value">{totalStock}</div>
        <div className="stock-unit">packets</div>
      </div>

      {/* ── Tabs ── */}
      <div className="stock-tabs">
        <button
          className={`stock-tab ${activeTab === 'fy' ? 'active' : ''}`}
          onClick={() => setActiveTab('fy')}
        >
          <span className="tab-label">This Financial Year</span>
          <span className="tab-sub">{fyRange.label}</span>
        </button>
        <button
          className={`stock-tab ${activeTab === 'alltime' ? 'active' : ''}`}
          onClick={() => setActiveTab('alltime')}
        >
          <span className="tab-label">All Time</span>
          <span className="tab-sub">Since Jan 01 2026</span>
        </button>
      </div>

      {/* ── Details ── */}
      <div className="stock-details">
        <div className="stock-detail-item">
          <span className="detail-label">
            {isAllTime ? 'All Time Production' : 'FY Production'}
          </span>
          <span className="detail-value">
            {isLoading ? <span className="detail-skeleton" /> : displayProduction}
          </span>
        </div>
        <div className="stock-detail-divider" />
        <div className="stock-detail-item">
          <span className="detail-label">
            {isAllTime ? 'All Time Sales' : 'FY Sales'}
          </span>
          <span className="detail-value">
            {isLoading ? <span className="detail-skeleton" /> : displaySales}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalStock;