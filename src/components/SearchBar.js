const SearchBar = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="search-container">
      <div className="filter-group">
        <label>Location</label>
        <input 
          type="text" 
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
          placeholder="e.g. Colombo"
        />
      </div>

      <div className="filter-group">
        <label>Type</label>
        <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
          <option>Any Property</option>
          <option>House</option>
          <option>Apartment</option>
          <option>Villa</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range (Max)</label>
        <input 
          type="number" 
          value={filters.maxPrice}
          onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
        />
      </div>

      <div className="filter-group">
        <label>Date Added After</label>
        <input 
          type="date" 
          value={filters.dateAfter}
          onChange={(e) => setFilters({...filters, dateAfter: e.target.value})}
        />
      </div>

      <button className="search-btn" onClick={onSearch}>Search</button>
    </div>
  );
};