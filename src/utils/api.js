// src/utils/api.js - WITH TOKEN EXPIRATION HANDLING
import axios from 'axios';

const API_BASE_URL = 'https://makhanchor-backend.onrender.com/api';
// const API_BASE_URL = 'http://localhost:5000/api';

// Token expiration duration (7 days in milliseconds)
const TOKEN_EXPIRATION_DAYS = 7;
const TOKEN_EXPIRATION_MS = TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Check if token is expired
export const isTokenExpired = () => {
  const loginTime = localStorage.getItem('dashboard_login_time');
  if (!loginTime) return true;

  const now = Date.now();
  const elapsed = now - parseInt(loginTime);
  
  return elapsed >= TOKEN_EXPIRATION_MS;
};

// Get remaining time until token expires (in milliseconds)
export const getTokenRemainingTime = () => {
  const loginTime = localStorage.getItem('dashboard_login_time');
  if (!loginTime) return 0;

  const now = Date.now();
  const elapsed = now - parseInt(loginTime);
  const remaining = TOKEN_EXPIRATION_MS - elapsed;
  
  return remaining > 0 ? remaining : 0;
};

// Format remaining time for display
export const formatRemainingTime = () => {
  const remaining = getTokenRemainingTime();
  if (remaining === 0) return 'Expired';

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours}h`;
  }
  return `${hours} hour${hours > 1 ? 's' : ''}`;
};

// Logout and clear all data
export const performLogout = () => {
  localStorage.removeItem('dashboard_token');
  localStorage.removeItem('dashboard_user');
  localStorage.removeItem('dashboard_login_time');
  window.location.reload();
};

// Add token to requests
api.interceptors.request.use(
  (config) => {
    // Check if token is expired before making request
    if (isTokenExpired()) {
      console.log('🔒 Token expired, logging out...');
      performLogout();
      return Promise.reject(new Error('Token expired'));
    }

    const token = localStorage.getItem('dashboard_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized, logging out...');
      performLogout();
    }
    return Promise.reject(error);
  }
);

// Store login time when user logs in
export const storeLoginTime = () => {
  localStorage.setItem('dashboard_login_time', Date.now().toString());
};

// Check token expiration on app start
export const checkTokenOnStartup = () => {
  const token = localStorage.getItem('dashboard_token');
  if (token && isTokenExpired()) {
    console.log('🔒 Token expired on startup, clearing data...');
    performLogout();
  }
};