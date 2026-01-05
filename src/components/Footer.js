import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">EstateFinder</Link>
          <p>Your trusted partner in finding the perfect home in Sri Lanka.</p>
        </div>

        

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: info@estatefinder.lk</p>
          <p>Phone: +94 112 345 678</p>
          <p>Address: Colombo 07, Sri Lanka</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EstateFinder. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;