import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RestaurantCard from '../components/RestaurantCard';

const CustomerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [parkingFilter, setParkingFilter] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('evalData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRestaurants(parsedData);
      setFilteredRestaurants(parsedData);
    }
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.restaurantName.toLowerCase().includes(term) ||
        restaurant.address.toLowerCase().includes(term)
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(restaurant =>
        restaurant.type === typeFilter
      );
    }

    if (parkingFilter) {
      const hasParking = parkingFilter === 'true';
      filtered = filtered.filter(restaurant =>
        restaurant.parkinglot === hasParking
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, typeFilter, parkingFilter, restaurants]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterType = (type) => {
    setTypeFilter(type);
  };

  const handleFilterParking = (parking) => {
    setParkingFilter(parking);
  };

  return (
    <Layout>
      <div className="customer-dashboard">
        <h3>Available Restaurants ({filteredRestaurants.length})</h3>
        
        {filteredRestaurants.length === 0 ? (
          <div className="no-results">
            {restaurants.length === 0 ? 
              'No restaurants available.' : 
              'No restaurants match your search/filters.'}
          </div>
        ) : (
          <div className="restaurants-grid">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.restaurantID}
                restaurant={restaurant}
                isAdmin={false}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomerDashboard;