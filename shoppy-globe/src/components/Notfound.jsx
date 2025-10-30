import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Import the CSS file

function NotFound() {
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-title">Oops! Page Not Found</h2>
      <p className="error-message">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="home-button">
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
