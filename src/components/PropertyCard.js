import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      {/* 1. Image Container with Badge & Heart */}
      <div className="card-image-wrapper">
        <img 
          src={`${process.env.PUBLIC_URL}/${property.picture}`} 
          alt={property.type} 
          className="card-main-img" 
        />
        
        <button className="favorite-btn" aria-label="Add to Shortlist">
          <img 
            src={`${process.env.PUBLIC_URL}/img/favv.png`} 
            alt="Favorite" 
            className="heart-icon-img" 
          />
        </button>
      </div>

      {/* 2. Content Section */}
      <div className="card-body">
        <h3 className="card-price">LKR {property.price.toLocaleString()}</h3>
        <p className="card-title">{property.bedrooms} Bed {property.type}</p>
        <p className="card-address">{property.location}, Sri Lanka</p>



        {/* 4. Footer with View Details */}
        <div className="card-footer">
          <span className="added-date">
            Added : {property.added.month} {property.added.day}, {property.added.year}
          </span>
          <button className="view-details-link">View details &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;