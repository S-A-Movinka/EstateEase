import React from 'react';
import PropertyCard from './PropertyCard';


const PropertyList = ({ properties }) => (
  <section className="property-list">
    {properties.map(prop => (
      <PropertyCard key={prop.id} property={prop} />
    ))}
  </section>
);

export default PropertyList;