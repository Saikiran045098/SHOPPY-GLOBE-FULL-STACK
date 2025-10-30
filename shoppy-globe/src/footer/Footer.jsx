import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section - Brand Info */}
        <div className="footer-section about">
          <h2 className="footer-logo">🛍️ Shopppy Globe</h2>
          <p className="footer-desc">
            Shopppy Globe is your one-stop destination for high-quality, affordable products.
            Discover electronics, fashion, home essentials, and more — all in one place.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>📧 Email: support@shopppyglobe.com</p>
          <p>📞 Phone: +91 00000 00000</p>
          <p>📍 Location: Hyderabad, India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Shopppy Globe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
