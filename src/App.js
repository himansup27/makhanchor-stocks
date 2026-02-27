// src/App.js - FIXED INFINITE LOOP
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import GlobalLoader from './components/Common/GlobalLoader';
import {
  api,
  storeLoginTime,
  checkTokenOnStartup,
  getTokenRemainingTime,
  performLogout,
} from './utils/api';
import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // ✅ Login-only loading state — never used to hide/unmount the Dashboard
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginLoadingMessage, setLoginLoadingMessage] = useState('Loading...');

  const autoLogoutTimerRef = useRef(null);

  // Check token expiration on mount
  useEffect(() => {
    checkTokenOnStartup();

    const token = localStorage.getItem('dashboard_token');
    const user = localStorage.getItem('dashboard_user');
    if (token && user) {
      setIsAuthenticated(true);
      setUserName(JSON.parse(user).name);
      setupAutoLogoutTimer();
    }
  }, []);

  const setupAutoLogoutTimer = () => {
    // Clear any existing timer
    if (autoLogoutTimerRef.current) {
      clearTimeout(autoLogoutTimerRef.current);
    }

    const remainingTime = getTokenRemainingTime();

    if (remainingTime > 0) {
      console.log(`⏰ Auto-logout scheduled in ${Math.round(remainingTime / 60000)}min`);

      autoLogoutTimerRef.current = setTimeout(() => {
        console.log('🔒 Session expired after 7 days, logging out...');
        alert('Your session has expired after 7 days. Please login again.');
        performLogout();
      }, remainingTime);
    } else {
      performLogout();
    }
  };

  // ✅ REMOVED: Global API interceptors that were calling setIsLoading(true/false)
  // Those interceptors were causing Dashboard to unmount on every API call,
  // which triggered the infinite refetch loop.
  // Dashboard manages its own loading state internally — App.js doesn't need to know.

  const handleLogin = async (mobile, password) => {
    setIsLoginLoading(true);
    setLoginLoadingMessage('Logging in...');

    try {
      const response = await axios.post(
        'https://makhanchor-backend.onrender.com/api/auth/login',
        { mobile, password }
      );

      if (response.data.success) {
        localStorage.setItem('dashboard_token', response.data.token);
        localStorage.setItem('dashboard_user', JSON.stringify(response.data.user));
        storeLoginTime();

        setUserName(response.data.user.name);
        setIsAuthenticated(true);
        setupAutoLogoutTimer();

        setIsLoginLoading(false);
        return { success: true };
      }
    } catch (error) {
      setIsLoginLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid credentials',
      };
    }
  };

  const handleLogout = () => {
    setIsLoginLoading(true);
    setLoginLoadingMessage('Logging out...');

    if (autoLogoutTimerRef.current) {
      clearTimeout(autoLogoutTimerRef.current);
    }

    setTimeout(() => {
      performLogout();
    }, 500);
  };

  // ✅ GlobalLoader is ONLY shown during login/logout — never during Dashboard API calls
  if (isLoginLoading) {
    return <GlobalLoader message={loginLoadingMessage} />;
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ✅ Dashboard stays mounted permanently — it manages its own internal loading state
  return <Dashboard userName={userName} onLogout={handleLogout} />;
};

export default App;