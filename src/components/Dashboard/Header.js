// src/components/Dashboard/Header.js
import React from 'react';
import { LogOut, RefreshCw, Package } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import '../../styles/Header.css';
import Logo from '../../Assets/images/makhanchor_logo.png'

const Header = ({ userName, totalStock, onLogout, onRefresh, loading }) => {
  const { isScrolled } = useScrollPosition();

  return (
    <header className={`dashboard-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-logo"><img src={Logo}/></h1>
          {isScrolled && (
            <div className="header-stock-mini">
              <Package size={16} />
              <span>{totalStock} packets</span>
            </div>
          )}
        </div>

        <div className="header-right">
          <div className="header-user">
            <span>{userName}</span>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="header-btn"
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
          </button>
          <button onClick={onLogout} className="header-btn logout" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;