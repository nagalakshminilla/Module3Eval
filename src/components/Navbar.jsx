import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onSearch, onFilterType, onFilterParking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [parkingFilter, setParkingFilter] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Auto focus search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setTypeFilter(value);
    if (onFilterType) onFilterType(value);
  };

  const handleParkingChange = (e) => {
    const value = e.target.value;
    setParkingFilter(value);
    if (onFilterParking) onFilterParking(value);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const restaurantTypes = [
    'Rajasthani', 'Gujarati', 'Mughlai', 'Jain', 
    'Thai', 'North Indian', 'South Indian'
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Restaurant Management</h2>
        {user && <span className="user-role">({user.role})</span>}
      </div>

      <div className="navbar-controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="filters">
          <select 
            value={typeFilter} 
            onChange={handleTypeChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            {restaurantTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select 
            value={parkingFilter} 
            onChange={handleParkingChange}
            className="filter-select"
          >
            <option value="">All Parking</option>
            <option value="true">Has Parking</option>
            <option value="false">No Parking</option>
          </select>
        </div>
      </div>

      {user && (
        <div className="navbar-actions">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;