import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // custom styles

const HomePage = () => {
  return (
    <div className="homepage-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to <span className="brand-name">SparkPath</span></h1>
            <p className="subtitle">
              Your journey to a brighter, cleaner, and smarter world starts here. SparkPath connects innovation with sustainability through intelligent transport solutions.
            </p>
            <Link to="/sign" className="explore-btn">Explore Now</Link>
          </div>

          <div className="hero-image">
            <img src="/image1.png" alt="SparkPath Hero" />
          </div>
        </div>
      </section>

      <footer className="homepage-footer">
        <p>© 2025 SparkPath. Empowering sustainable journeys.</p>
      </footer>
    </div>
  );
};

export default HomePage;
