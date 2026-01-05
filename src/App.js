import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import propertyData from './data/properties.json'; 
import Header from './components/Header';
import Footer from './components/Footer';

import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import ScrollToTop from './components/ScrollToTop';

import './App.css';

function App() {
  // Initialize state here
  const [properties] = useState(propertyData.properties);
  const [shortlist, setShortlist] = useState([]); // Adding this to prevent shortlist errors later

  return (
    // Add basename here to match your browser URL
    <Router basename="/estate-agent-app"> 
      <ScrollToTop />
      <div className="App">
        <Header shortlistCount={shortlist.length} />
        <Routes>
          <Route
            path="/" 
            element={<SearchPage properties={properties} shortlist={shortlist} setShortlist={setShortlist} />} 
          />
          <Route 
            path="/property/:id" 
            element={
              <PropertyPage 
                properties={properties} 
                shortlist={shortlist}      
                setShortlist={setShortlist} 
              />
            } 
          />
        
        </Routes>
        <Footer/>
        
      </div>
    </Router>

      
    
  );
}

export default App;