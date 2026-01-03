import React, { useState } from 'react';

const Sidebar = ({ onAddRestaurant }) => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    type: 'Rajasthani',
    parkinglot: 'true',
    image: 'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg'
  });

  const restaurantTypes = [
    'Rajasthani', 'Gujarati', 'Mughlai', 'Jain', 
    'Thai', 'North Indian', 'South Indian'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.restaurantName.trim() || !formData.address.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate unique ID
    const restaurantID = Date.now();
    
    const newRestaurant = {
      ...formData,
      restaurantID,
      parkinglot: formData.parkinglot === 'true'
    };

    onAddRestaurant(newRestaurant);
    
    // Clear form
    setFormData({
      restaurantName: '',
      address: '',
      type: 'Rajasthani',
      parkinglot: 'true',
      image: 'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg'
    });

    alert('Restaurant added successfully!');
  };

  return (
    <aside className="sidebar">
      <h3>Add New Restaurant</h3>
      <form onSubmit={handleSubmit} className="restaurant-form">
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

        <button type="submit" className="submit-btn">
          Add Restaurant
        </button>
      </form>
    </aside>
  );
};

export default Sidebar;