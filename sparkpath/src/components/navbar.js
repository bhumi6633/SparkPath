import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/image1.png" alt="SparkPath Logo" className="logo-image"/>
                    <Link className='navbar-title' to='/home'>SparkPath</Link>
                </div>
                <div className="navbar-menu">
                    <Link className="nav-item" to="/post">Post a Ride</Link>
                    <Link className="nav-item" to="find-a-ride">Locate a Ride</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;