import React, { useState, useEffect } from 'react';
// 1. MUI Imports 
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import PropertyList from '../components/PropertyList';
import './SearchPage.css';

const SearchPage = ({ properties, shortlist, setShortlist }) => {
  
  const [filters, setFilters] = useState({
    location: '',
    type: 'Any Property',
    minPrice: 0,
    maxPrice: 200000000, 
    bedrooms: 'Any',
    dateAfter: ''
  });

  const [filteredResults, setFilteredResults] = useState(properties || []);

  // Sync results when properties arrive
  useEffect(() => {
    if (properties) setFilteredResults(properties);
  }, [properties]);

  if (!properties || properties.length === 0) return <div className="loading">Loading...</div>;

  // LOGIC: Shortlist Management
  const addToShortlist = (property) => {
    if (!shortlist.find(item => item.id === property.id)) {
      setShortlist([...shortlist, property]);
    }
  };

  // DRAG AND DROP LOGIC
  const handleDragOver = (e) => e.preventDefault();

  const handleDropToAdd = (e) => {
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = properties.find(p => p.id === propertyId);
    if (propertyToAdd) addToShortlist(propertyToAdd);
  };

  const handleDropToRemove = (e) => {
    const idToRemove = e.dataTransfer.getData("removeId");
    if (idToRemove) {
      setShortlist(shortlist.filter(item => item.id !== idToRemove));
    }
  };

  // FILTER LOGIC
  const handleSearch = () => {
    const results = properties.filter((prop) => {
      const matchLocation = prop.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                            prop.postcode.toLowerCase().startsWith(filters.location.toLowerCase());
      const matchType = filters.type === 'Any Property' || prop.type === filters.type;
      const maxVal = filters.maxPrice === '' ? Infinity : parseInt(filters.maxPrice);
      const matchPrice = prop.price >= filters.minPrice && prop.price <= maxVal;
      
      const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
      const monthIndex = monthNames.indexOf(prop.added.month);
      const propDate = new Date(prop.added.year, monthIndex, prop.added.day);
      const searchDate = filters.dateAfter ? new Date(filters.dateAfter) : null;
      const matchDate = !searchDate || propDate >= searchDate;

      return matchLocation && matchType && matchPrice && matchDate;
    });
    setFilteredResults(results);
  };

  return (
    <div className="search-page-container">

      {/* SEARCH SECTION USING MUI WIDGETS */}
      <section className="search-hero">
        <h1>Find your dream home</h1>
        <div className="search-box">
          
          {/* 1. Location Widget */}
          <div className="search-field">
            <label>Location</label>
            <TextField 
              placeholder="e.g. Colombo"
              variant="standard" // "Standard" looks most like a normal input
              fullWidth
              InputProps={{ disableUnderline: false }} // Keeps a clean line
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>

          {/* 2. Property Type Widget */}
          <div className="search-field">
            <label>Type</label>
            <Select
              value={filters.type}
              variant="standard"
              fullWidth
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <MenuItem value="Any Property">Any Property</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
              <MenuItem value="Bungalow">Bungalow</MenuItem>
            </Select>
          </div>

          {/* 3. Price Widget */}
          <div className="search-field">
            <label>Price Range (Max)</label>
            <TextField 
              type="number"
              placeholder="Max Price"
              variant="standard"
              fullWidth
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} 
            />
          </div>

          {/* 4. Date Widget */}
          <div className="search-field">
            <label>Date Added After</label>
            <TextField 
              type="date"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setFilters({...filters, dateAfter: e.target.value})} 
            />
          </div>

          {/* 5. Button Widget */}
          <Button 
            className="main-search-btn" 
            variant="contained" 
            onClick={handleSearch}
            sx={{ 
              textTransform: 'none', 
              borderRadius: '4px',
              padding: '10px 25px'
            }}
          >
            Search
          </Button>
        </div>
      </section>

      <div className="main-layout">
        {/* Results area also acts as a "Trash Zone" for dragging items OUT of favorites */}
        <div 
          className="left-column"
          onDragOver={handleDragOver}
          onDrop={handleDropToRemove}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>{filteredResults.length} properties found</Typography>
          <PropertyList properties={filteredResults} onAddToShortlist={addToShortlist} />
        </div>

        {/* Sidebar acts as the "Drop Zone" for adding items */}
        <aside 
          className="right-sidebar" 
          onDragOver={handleDragOver} 
          onDrop={handleDropToAdd}
        >
          <div className="sidebar-card">
            <h3 className="fav-title">
              <img src={`${process.env.PUBLIC_URL}/img/favv.png`} alt="" className="heart-icon-img" />
              <span> Favourites ({shortlist.length})</span>
            </h3>
            
            {shortlist.length === 0 ? (
              <p className="empty-msg"><i>Drag properties here or click the heart icon.</i></p>
            ) : (
              <div className="shortlist-display">
                {shortlist.map(item => (
                  <div 
                    key={item.id} 
                    className="shortlist-item-mini"
                    draggable 
                    onDragStart={(e) => e.dataTransfer.setData("removeId", item.id)}
                  >
                    <img src={`${process.env.PUBLIC_URL}/${item.picture}`} alt="" width="50" />
                    <div className="mini-details">
                        <p><strong>{item.type}</strong></p>
                        <p>LKR {item.price.toLocaleString()}</p>
                    </div>
                    <button
                      className="remove-btn" 
                      onClick={() => setShortlist(shortlist.filter(s => s.id !== item.id))}>×</button>
                  </div>
                ))}
                <Button 
                  color="error" 
                  fullWidth 
                  onClick={() => setShortlist([])}
                  
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;