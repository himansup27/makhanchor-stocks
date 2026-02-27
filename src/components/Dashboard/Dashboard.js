// src/components/Dashboard/Dashboard.js - FIXED REPEATED API CALLS
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../../utils/api';
import { formatDate, toTotalDabbas } from '../../utils/helpers';
import Header from './Header';
import TotalStock from './TotalStock';
import DateRangeFilter from './DateRangeFilter';
import StatsGrid from './StatsGrid';
import ChartsSection from './ChartsSection';
import InventorySection from './InventorySection';
import RawMaterialsSection from './RawMaterialsSection';
import TopCustomersSection from './TopCustomersSection';
import GlobalLoader from '../Common/GlobalLoader';
import DashboardLoader from '../Common/DashboardLoader';
import '../../styles/Dashboard.css';

const Dashboard = ({ userName, onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [dateRange, setDateRange] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Track in-flight fetch so we can cancel it if dependencies change
  const abortControllerRef = useRef(null);

  const getDateRange = useCallback((dateRange, startDate, endDate) => {
    const now = new Date();
    let start, end;

    switch (dateRange) {
      case 'today':
        start = formatDate(now);
        end = formatDate(now);
        break;
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        start = formatDate(yesterday);
        end = formatDate(yesterday);
        break;
      case 'last7days':
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        start = formatDate(sevenDaysAgo);
        end = formatDate(now);
        break;
      case 'last30days':
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
        start = formatDate(thirtyDaysAgo);
        end = formatDate(now);
        break;
      case 'thisMonth':
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        start = formatDate(firstDay);
        end = formatDate(now);
        break;
      case 'lastMonth':
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        start = formatDate(firstDayLastMonth);
        end = formatDate(lastDayLastMonth);
        break;
      case 'custom':
        if (startDate && endDate) {
          start = startDate;
          end = endDate;
        } else {
          const defaultStart = new Date(now);
          defaultStart.setDate(defaultStart.getDate() - 6);
          start = formatDate(defaultStart);
          end = formatDate(now);
        }
        break;
      default:
        start = formatDate(now);
        end = formatDate(now);
    }

    console.log('📅 Date Range:', dateRange, '→', start, 'to', end);
    return { start, end };
  }, []); // No dependencies — pure function based on arguments

  const fetchDashboardData = useCallback(async (dateRange, startDate, endDate) => {
    // Cancel any previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);
    try {
      const dates = getDateRange(dateRange, startDate, endDate);
      const params = { startDate: dates.start, endDate: dates.end };

      console.log('🔄 Fetching data for:', params);

      const [
        rangeProd,
        rangeSales,
        allTimeProd,
        inventory,
        miscStats,
        trendProdData,
        trendSalesData,
        customerSalesData,
      ] = await Promise.all([
        api.get(`/production/stats`, { params, signal }),
        api.get(`/sales/stats`, { params, signal }),
        api.get(`/production/stats`, { signal }),
        api.get(`/inventory/all/stats`, { signal }),
        api.get(`/miscellaneous/stats`, { params, signal }),
        api.get(`/production`, { params: { ...params, limit: 1000 }, signal }),
        api.get(`/sales`, { params: { ...params, limit: 1000 }, signal }),
        api.get(`/sales`, { params: { ...params, limit: 1000 }, signal }),
      ]);

      if (signal.aborted) return;

      // Calculate inventory stats for date range
      const calculateInventoryStats = async (category) => {
        const [imports, consumption] = await Promise.all([
          api.get(`/inventory/${category}?type=import&startDate=${dates.start}&endDate=${dates.end}&limit=10000`, { signal }),
          api.get(`/inventory/${category}?type=consumption&startDate=${dates.start}&endDate=${dates.end}&limit=10000`, { signal }),
        ]);

        const totalImported = imports.data.data.reduce((sum, item) => sum + item.quantity, 0);
        const totalConsumed = consumption.data.data.reduce((sum, item) => sum + item.quantity, 0);

        return { imported: totalImported, consumed: totalConsumed };
      };

      const [maidaStats, oilStats, gheeStats] = await Promise.all([
        calculateInventoryStats('maida'),
        calculateInventoryStats('oil'),
        calculateInventoryStats('ghee'),
      ]);

      if (signal.aborted) return;

      const calculateRawMaterialPurchases = async (type) => {
        console.log(`🔍 Fetching ${type} purchases for ${dates.start} to ${dates.end}`);

        const response = await api.get(`/raw-materials/${type}`, {
          params: { startDate: dates.start, endDate: dates.end, limit: 10000 },
          signal,
        });

        const data = response.data.data;
        console.log(`✅ ${type} data:`, data.length, 'records');

        if (type === 'gas') {
          const bigTanks = data.reduce((sum, item) => sum + (item.bigTanks || 0), 0);
          const smallTanks = data.reduce((sum, item) => sum + (item.smallTanks || 0), 0);
          console.log(`   Gas: Big=${bigTanks}, Small=${smallTanks}`);
          return { bigTanks, smallTanks };
        }

        const total = data.reduce((sum, item) => sum + (item.quantity || 0), 0);
        console.log(`   ${type}: ${total} units`);
        return total;
      };

      const [sujiPurchased, sugarPurchased, saltPurchased, gasPurchased] = await Promise.all([
        calculateRawMaterialPurchases('suji'),
        calculateRawMaterialPurchases('sugar'),
        calculateRawMaterialPurchases('salt'),
        calculateRawMaterialPurchases('gas'),
      ]);

      if (signal.aborted) return;

      const trendData = processTrendData(trendProdData.data.data, trendSalesData.data.data);
      const topCustomers = processTopCustomers(customerSalesData.data.data);

      setDashboardData({
        range: {
          production: rangeProd.data.data.totalProduction || 0,
          sales: rangeSales.data.data.totalSales || 0,
        },
        allTime: {
          production: allTimeProd.data.data.totalProduction || 0,
          sales: allTimeProd.data.data.totalSold || 0,
          remaining: allTimeProd.data.data.totalRemaining || 0,
        },
        inventory: {
          maida: {
            currentStock: inventory.data.data.maida?.currentStock || 0,
            imported: maidaStats.imported,
            consumed: maidaStats.consumed,
          },
          oil: {
            currentStock: inventory.data.data.oil?.currentStock || 0,
            imported: oilStats.imported,
            consumed: oilStats.consumed,
          },
          ghee: {
            currentStock: inventory.data.data.ghee?.currentStock || 0,
            imported: gheeStats.imported,
            consumed: gheeStats.consumed,
          },
        },
        rawMaterials: {
          suji: sujiPurchased,
          sugar: sugarPurchased,
          salt: saltPurchased,
          gasBig: gasPurchased.bigTanks || 0,
          gasSmall: gasPurchased.smallTanks || 0,
        },
        miscellaneous: {
          totalSpending: miscStats.data.data.rangeSpending || miscStats.data.data.totalSpending || 0,
        },
        trendData,
        topCustomers,
      });

      console.log('✅ Dashboard data updated:', {
        dateRange: `${dates.start} to ${dates.end}`,
        rawMaterials: {
          suji: sujiPurchased,
          sugar: sugarPurchased,
          salt: saltPurchased,
          gasBig: gasPurchased.bigTanks,
          gasSmall: gasPurchased.smallTanks,
        },
      });

      setLastUpdated(new Date());
    } catch (error) {
      if (error.name === 'AbortError' || error.name === 'CanceledError') {
        console.log('🚫 Fetch aborted — new request in flight');
        return; // Don't update state or show error for cancelled requests
      }
      console.error('❌ Error fetching dashboard data:', error);
      if (error.message !== 'Token expired') {
        alert('Failed to load dashboard data. Please try refreshing.');
      }
    } finally {
      // Only clear loading if this request wasn't aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [getDateRange]); // stable — getDateRange never changes

  // ✅ Pass date values as arguments to avoid stale closure issues
  useEffect(() => {
    fetchDashboardData(dateRange, startDate, endDate);

    return () => {
      // Cleanup: abort on unmount or before next effect run
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dateRange, startDate, endDate, fetchDashboardData]);

  const processTrendData = (production, sales) => {
    const dailyData = {};

    production.forEach(p => {
      const date = p.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { date, production: 0, sales: 0 };
      }
      dailyData[date].production += p.packets;
    });

    sales.forEach(s => {
      const date = s.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { date, production: 0, sales: 0 };
      }
      dailyData[date].sales += s.packets;
    });

    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(d => ({
        date: new Date(d.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        production: d.production,
        sales: d.sales,
      }));
  };

  const processTopCustomers = (sales) => {
    const customerMap = {};

    sales.forEach(s => {
      const customer = s.customer || 'Walk-in';
      if (!customerMap[customer]) {
        customerMap[customer] = { name: customer, dabbas: 0, packets: 0 };
      }
      customerMap[customer].dabbas += toTotalDabbas(s.packets);
      customerMap[customer].packets = customerMap[customer].dabbas / 16;
    });

    return Object.values(customerMap)
      .sort((a, b) => b.dabbas - a.dabbas)
      .slice(0, 5);
  };

  // Manual refresh handler (passes current state values explicitly)
  const handleRefresh = useCallback(() => {
    fetchDashboardData(dateRange, startDate, endDate);
  }, [fetchDashboardData, dateRange, startDate, endDate]);

  if (loading && !dashboardData) {
    return <GlobalLoader message="Loading dashboard..." />;
  }

  if (!dashboardData) return null;

  return (
    <div className="dashboard">
      {/* ✅ Non-blocking overlay — Dashboard stays mounted, no remount loop */}
      <DashboardLoader loading={loading && !!dashboardData} message="Updating..." />

      <Header
        userName={userName}
        totalStock={dashboardData.allTime.remaining}
        onLogout={onLogout}
        onRefresh={handleRefresh}
        loading={loading}
      />

      <div className="dashboard-content">
        <TotalStock
          totalStock={dashboardData.allTime.remaining}
          production={dashboardData.allTime.production}
          sales={dashboardData.allTime.sales}
        />

        <DateRangeFilter
          dateRange={dateRange}
          setDateRange={setDateRange}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />

        <StatsGrid
          production={dashboardData.range.production}
          sales={dashboardData.range.sales}
        />

        <ChartsSection trendData={dashboardData.trendData} />

        <div className="sections-grid">
          <InventorySection inventory={dashboardData.inventory} />
          <RawMaterialsSection
            rawMaterials={dashboardData.rawMaterials}
            dateRange={dateRange}
          />
        </div>

        <TopCustomersSection customers={dashboardData.topCustomers} />
      </div>
    </div>
  );
};

export default Dashboard;