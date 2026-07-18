import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <span className="error-code">404</span>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.</p>
        <Link to="/" className="home-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
