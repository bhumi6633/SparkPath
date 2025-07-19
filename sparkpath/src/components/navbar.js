import React from 'react';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">SparkPath</div>
                <div className="navbar-menu">
                    <span className="nav-item">Post a Ride</span>
                    <span className="nav-item">Locate a Ride</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;