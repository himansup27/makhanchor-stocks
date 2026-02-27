// src/components/Auth/LoginPage.js - FIXED
import React, { useState } from 'react';
import { Lock, Phone, KeyRound, Eye, EyeOff } from 'lucide-react';
import '../../styles/LoginPage.css';
import Logo from '../../Assets/images/makhanchor_logo.png'

const LoginPage = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await onLogin(mobile, password);
    
    if (!result.success) {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="login-header">
          <div className="login-icon">
            <img src={Logo}/>
          </div>
          <p className="login-subtitle">Dashboard Access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Mobile Number</label>
            <div className="input-wrapper">
              <Phone className="input-icon" size={20} />
              <input
                type="tel"
                inputMode="numeric"
                maxLength="10"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setError('');
                }}
                className="input-field"
                placeholder="Enter mobile number"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <KeyRound className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="input-field with-toggle"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? (
              <span className="button-content">
                <span className="spinner"></span>
                <span>Logging in...</span>
              </span>
            ) : (
              <span className="button-content">Login</span>
            )}
          </button>
        </form>

        <p className="login-footer">Secured access for authorized personnel only</p>
      </div>
    </div>
  );
};

export default LoginPage;