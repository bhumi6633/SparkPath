import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

function Navbar() {
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        closeDropdown();
    };

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
                        <div className="dropdown">
                            <button className="nav-item-dropbtn" onClick={toggleDropdown}>
                                Signed In
                                <i className="fa fa-caret-down"></i>
                            </button>
                            <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                                <Link to='/home' onClick={handleSignOut} className="dropdown-signout-btn">Sign Out</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;