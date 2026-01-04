import React from 'react';
import PropertyCard from './PropertyCard';


const PropertyList = ({ properties, onAddToShortlist }) => {
  return (
    <div className="property-list">
      {properties.map(prop => (
        <PropertyCard 
          key={prop.id} 
          property={prop} 
          onAddToShortlist={onAddToShortlist} 
        />
      ))}
    </div>
  );
};
export default PropertyList;