import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant, isAdmin, onDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/admin/restaurants/update/${restaurant.restaurantID}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      onDelete(restaurant.restaurantID);
    }
  };

  return (
    <div className="restaurant-card">
      <div className="card-image">
        <img src={restaurant.image} alt={restaurant.restaurantName} />
      </div>
      <div className="card-content">
        <h3 className="restaurant-name">{restaurant.restaurantName}</h3>
        <p className="restaurant-address">{restaurant.address}</p>
        <div className="restaurant-details">
          <span className="restaurant-type">{restaurant.type}</span>
          <span className={`parking-status ${restaurant.parkinglot ? 'available' : 'unavailable'}`}>
            {restaurant.parkinglot ? '🚗 Parking Available' : '❌ No Parking'}
          </span>
        </div>
        <div className="restaurant-id">ID: {restaurant.restaurantID}</div>
        
        {isAdmin && (
          <div className="card-actions">
            <button onClick={handleUpdate} className="update-btn">
              Update
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;