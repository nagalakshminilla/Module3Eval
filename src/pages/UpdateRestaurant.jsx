import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    type: 'Rajasthani',
    parkinglot: 'true',
    image: ''
  });

  const restaurantTypes = [
    'Rajasthani', 'Gujarati', 'Mughlai', 'Jain', 
    'Thai', 'North Indian', 'South Indian'
  ];

  useEffect(() => {
    const storedData = localStorage.getItem('evalData');
    if (storedData && id) {
      const restaurants = JSON.parse(storedData);
      const restaurant = restaurants.find(r => r.restaurantID === parseInt(id));
      
      if (restaurant) {
        setFormData({
          restaurantName: restaurant.restaurantName,
          address: restaurant.address,
          type: restaurant.type,
          parkinglot: restaurant.parkinglot ? 'true' : 'false',
          image: restaurant.image
        });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.restaurantName.trim() || !formData.address.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (window.confirm('Are you sure you want to update this restaurant?')) {
      const storedData = localStorage.getItem('evalData');
      if (storedData) {
        const restaurants = JSON.parse(storedData);
        const updatedRestaurants = restaurants.map(restaurant => {
          if (restaurant.restaurantID === parseInt(id)) {
            return {
              ...restaurant,
              restaurantName: formData.restaurantName,
              address: formData.address,
              type: formData.type,
              parkinglot: formData.parkinglot === 'true',
              image: formData.image
            };
          }
          return restaurant;
        });

        localStorage.setItem('evalData', JSON.stringify(updatedRestaurants));
        alert('Restaurant updated successfully!');
        navigate('/admin/dashboard');
      }
    }
  };

  return (
    <Layout>
      <div className="update-restaurant">
        <h2>Update Restaurant</h2>
        
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label>Restaurant Name *</label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              required
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              {restaurantTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Parking Lot</label>
            <select
              name="parkinglot"
              value={formData.parkinglot}
              onChange={handleChange}
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="update-btn">
              Update Restaurant
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateRestaurant;