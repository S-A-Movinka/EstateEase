import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import './PropertyPage.css';

// ADD shortlist and setShortlist here to keep favorites synced
const PropertyPage = ({ properties, shortlist, setShortlist }) => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  const [mainImage, setMainImage] = useState(property?.picture);

  if (!property) return <div className="error">Property not found.</div>;

  // 2. Logic to check if this house is already a favorite
  const isFavorite = shortlist.some(item => item.id === property.id);

  // 3. Logic to add/remove from favorites
  const toggleFavorite = () => {
    if (isFavorite) {
      setShortlist(shortlist.filter(item => item.id !== property.id));
    } else {
      setShortlist([...shortlist, property]);
    }
  };

  return (
    <div className="property-page-container">
      <div className="top-nav">
        <Link to="/" className="back-link">← Back to Results</Link>
        <button 
          className={`page-fav-btn ${isFavorite ? 'is-fav' : ''}`} 
          onClick={toggleFavorite}
        >
          {/* The Icon (always visible) */}
          <img 
            src={`${process.env.PUBLIC_URL}/img/favv.png`} 
            alt="Favourite" 
            className="heart-icon-img" 
            
          />

          <span>
            {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
          </span>
        </button>
      </div>

      <div className="property-header">
        <div className="header-info">
          <span className="type-tag">{property.type}</span>
          <h1>{property.location}</h1>
          <h2 className="price-tag">LKR {property.price.toLocaleString()}</h2>
        </div>
      </div>

      {/* START OF SIDE-BY-SIDE LAYOUT */}
      <div className="property-main-layout">
        <section className="image-section">
          <div className="main-image-display">
            <img src={`${process.env.PUBLIC_URL}/${mainImage}`} alt="Main View" />
          </div>

          <div className="thumbnail-grid">
            <img 
              src={`${process.env.PUBLIC_URL}/${property.picture}`} 
              alt="Main thumbnail"
              className={mainImage === property.picture ? 'active-thumb' : ''}
              onClick={() => setMainImage(property.picture)}
            />
            {property.thumbnails?.map((img, index) => (
              <img 
                key={index}
                src={`${process.env.PUBLIC_URL}/${img}`} 
                alt={`Thumbnail ${index + 1}`}
                className={mainImage === img ? 'active-thumb' : ''}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>      
        </section>

        {/* This section is now INSIDE the main-layout div */}
        <section className="info-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Location Map</Tab>
            </TabList>

            <TabPanel>
              <h3>Property Overview</h3>
              <p className="long-desc">{property.longDescription}</p>
              <div className="property-specs">
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Tenure:</strong> {property.tenure}</p>
              </div>
            </TabPanel>

            <TabPanel>
              <h3>Layout Design</h3>
              <img src={`${process.env.PUBLIC_URL}/${property.floorPlan}`} alt="Floor Plan" className="floor-plan-img" />
            </TabPanel>
            
            {/*Google Map Display*/}
            <TabPanel>
              <h3>Find Us</h3>
              
              <iframe 
                title="Property Map"
                width="100%" 
                height="400" 
                src={property.mapUrl}
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </TabPanel>
          </Tabs>
        </section>
      </div> 
    </div>
  );
};

export default PropertyPage;