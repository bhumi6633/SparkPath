import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

function Navbar() {
    const { isSignedIn } = useContext(AuthContext);
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="/image1.png" alt="SparkPath Logo" className="logo-image"/>
                    </Link>
                    <Link className='navbar-title' to='/'>SparkPath</Link>
                </div>
                <div className="navbar-menu">
                    <Link className="nav-item" to="/post">Post a Ride</Link>
                    <Link className="nav-item" to="find-a-ride">Locate a Ride</Link>
                    {!isSignedIn && (
                        <Link className="nav-item" to="/sign">Sign In / Sign Up</Link>
                    )}
                    {isSignedIn && (
                        <span className="nav-item">Signed In</span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;