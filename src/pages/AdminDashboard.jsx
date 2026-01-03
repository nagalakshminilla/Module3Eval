import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import RestaurantCard from '../components/RestaurantCard';

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [parkingFilter, setParkingFilter] = useState('');

  // Load restaurants from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('evalData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRestaurants(parsedData);
      setFilteredRestaurants(parsedData);
    }
  }, []);

  // Apply filters whenever search or filters change
  useEffect(() => {
    let filtered = restaurants;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.restaurantName.toLowerCase().includes(term) ||
        restaurant.address.toLowerCase().includes(term)
      );
    }

    // Apply type filter
    if (typeFilter) {
      filtered = filtered.filter(restaurant =>
        restaurant.type === typeFilter
      );
    }

    // Apply parking filter
    if (parkingFilter) {
      const hasParking = parkingFilter === 'true';
      filtered = filtered.filter(restaurant =>
        restaurant.parkinglot === hasParking
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, typeFilter, parkingFilter, restaurants]);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('evalData', JSON.stringify(data));
  };

  const handleAddRestaurant = (newRestaurant) => {
    const updatedRestaurants = [...restaurants, newRestaurant];
    setRestaurants(updatedRestaurants);
    saveToLocalStorage(updatedRestaurants);
  };

  const handleDeleteRestaurant = (id) => {
    const updatedRestaurants = restaurants.filter(r => r.restaurantID !== id);
    setRestaurants(updatedRestaurants);
    saveToLocalStorage(updatedRestaurants);
    alert('Restaurant deleted successfully!');
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <Sidebar onAddRestaurant={handleAddRestaurant} />
        
        <div className="restaurants-section">
          <h3>All Restaurants ({filteredRestaurants.length})</h3>
          
          {filteredRestaurants.length === 0 ? (
            <div className="no-results">
              {restaurants.length === 0 ? 
                'No restaurants added yet. Add your first restaurant!' : 
                'No restaurants match your search/filters.'}
            </div>
          ) : (
            <div className="restaurants-grid">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.restaurantID}
                  restaurant={restaurant}
                  isAdmin={true}
                  onDelete={handleDeleteRestaurant}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;