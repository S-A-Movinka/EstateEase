import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';
import './SearchPage.css';

const SearchPage = ({ properties }) => {
  // 1. SEARCH STATE (The 10% Mark)
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any Property',
    minPrice: 0,
    maxPrice: 2000000,
    bedrooms: 'Any',
    dateAfter: ''
  });

  const [filteredResults, setFilteredResults] = useState(properties);

  // 2. FILTER LOGIC 
  const handleSearch = () => {
    const results = properties.filter((prop) => {
      const matchLocation = prop.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchType = filters.type === 'Any Property' || prop.type === filters.type;
      const matchPrice = prop.price >= filters.minPrice && prop.price <= filters.maxPrice;
      const matchBeds = filters.bedrooms === 'Any' || prop.bedrooms >= parseInt(filters.bedrooms);
      
      // Date filtering logic (comparing strings or Date objects)
      const matchDate = !filters.dateAfter || new Date(prop.dateAdded) >= new Date(filters.dateAfter);

      return matchLocation && matchType && matchPrice && matchBeds && matchDate;
    });
    setFilteredResults(results);
  };

  return (
    <div className="search-page-container">
      {/* SEARCH SECTION  */}
      <section className="search-hero">
        <h1>Find your dream home</h1>
        <div className="search-box">
          <div className="search-field">
            <label>Location</label>
            <input 
              type="text" 
              placeholder="e.g. Colombo" 
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>

          <div className="search-field">
            <label>Type</label>
            <select onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option>Any Property</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
            </select>
          </div>

          <div className="search-field">
            <label>Price Range (Max)</label>
            <input 
              type="number" 
              placeholder="Max Price" 
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} 
            />
          </div>

          <div className="search-field">
            <label>Date Added After</label>
            <input 
              type="date" 
              className="date-widget" 
              onChange={(e) => setFilters({...filters, dateAfter: e.target.value})} 
            />
          </div>

          <button className="main-search-btn" onClick={handleSearch}>Search</button>
        </div>
      </section>

      {/* RESULTS DISPLAY (7% Mark) */}
      <div className="main-layout">
        <div className="left-column">
          <div className="results-header">
            <h2>{filteredResults.length} properties found</h2>
          </div>
          <PropertyList properties={filteredResults} />
        </div>

        {/* SHORTLIST SIDEBAR (18% Mark) */}
        <aside className="right-sidebar">
          <div className="sidebar-card">
            <h3>❤️ Shortlist</h3>
            <p>Your saved properties will appear here.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;