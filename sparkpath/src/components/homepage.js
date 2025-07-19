import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <section className="hero hero-large">
        <div className="hero-text hero-text-large">
          <h2>Welcome to SparkPath</h2>
          <p>Your journey to a brighter, cleaner, and smarter world starts here. SparkPath connects innovation with sustainability through intelligent transport solutions.</p>
          <Link to="/sign" className="cta-button cta-button-large">Explore Now</Link>
        </div>
        <div className="hero-image hero-image-large">
          <div className="logo-border-home">
            <img src="/image1.png" alt="SparkPath" className="homepage-hero-img" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 SparkPath. Empowering sustainable journeys.</p>
      </footer>
    </div>
  );
};

export default HomePage;