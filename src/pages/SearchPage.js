import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';
import './SearchPage.css';


const SearchPage = ({ properties }) => {
  //SEARCH STATE 
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any Property',
    minPrice: 0,
    maxPrice: 2000000,
    bedrooms: 'Any',
    dateAfter: ''
  });


  const [filteredResults, setFilteredResults] = useState(properties);
  const [shortlist, setShortlist] = useState([]);
  
  // Function for clicking the heart icon
  const addToShortlist = (property) => {
    if (!shortlist.find(item => item.id === property.id)) {
      setShortlist([...shortlist, property]);
    }
  };

  // Functions for Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow a drop
  };

  const handleDrop = (e) => {
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = properties.find(p => p.id === propertyId);
    if (propertyToAdd) {
      addToShortlist(propertyToAdd);
    }
  };

  // FILTER LOGIC 
  const handleSearch = () => {
    const results = properties.filter((prop) => {
      const matchLocation = prop.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchType = filters.type === 'Any Property' || prop.type === filters.type;
      const maxVal = filters.maxPrice === '' ? Infinity : parseInt(filters.maxPrice);
      const matchPrice = prop.price >= filters.minPrice && prop.price <= maxVal;      const matchBeds = filters.bedrooms === 'Any' || prop.bedrooms >= parseInt(filters.bedrooms);
      
      // Date filtering logic (comparing strings or Date objects)
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    
      const monthIndex = monthNames.indexOf(prop.added.month);
      const propDate = new Date(prop.added.year, monthIndex, prop.added.day);
      const searchDate = filters.dateAfter ? new Date(filters.dateAfter) : null;
      const matchDate = !searchDate || propDate >= searchDate;

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

      {/* RESULTS DISPLAY  */}
      <div className="main-layout">
        <div className="left-column">
          <div className="results-header">
            <h2>{filteredResults.length} properties found</h2>
          </div>
          <PropertyList properties={filteredResults} onAddToShortlist={addToShortlist} />
        </div>

        {/* SHORTLIST SIDEBAR */}
        <aside 
          className="right-sidebar" 
          onDragOver={handleDragOver} 
          onDrop={handleDrop}
        >
          <div className="sidebar-card">
            <h3 className="fav-title">

              <img 
                src={`${process.env.PUBLIC_URL}/img/favv.png`} 
                alt="Favorite" 
                className="heart-icon-img" 
              />
              <span> Favourites ({shortlist.length})</span>
            </h3>
            
            {shortlist.length === 0 ? (
              <p>Drag properties here or click the heart icon.</p>
            ) : (
              <div className="shortlist-display">
                {shortlist.map(item => (
                  <div key={item.id} className="shortlist-item-mini">
                    <img src={`${process.env.PUBLIC_URL}/${item.picture}`} alt="" width="50" />
                    <p>{item.type} - LKR {item.price.toLocaleString()}</p>
                    <button
                      className="remove-btn" 
                      onClick={() => setShortlist(shortlist.filter(s => s.id !== item.id))}>×</button>
                  </div>
                ))}
                <button className="clear-all" onClick={() => setShortlist([])}>Clear All</button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;

