import React, { useState } from 'react';
import propertyData from './data/properties.json'; // Make sure this path is correct
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  // Initialize your state here
  const [properties] = useState(propertyData.properties);
  const [shortlist, setShortlist] = useState([]); // Adding this to prevent shortlist errors later

  return (
    <div className="App">
      {/* Pass the shortlist length to the Header */}
      <Header shortlistCount={shortlist.length} />
      
      {/* IMPORTANT: Pass the properties array to SearchPage */}
      <SearchPage properties={properties} />
    </div>
  );
}

export default App;