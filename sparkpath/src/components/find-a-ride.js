import React from 'react';
import { Link } from 'react-router-dom';

function FindaRideInfo() {
    return (
        <div className="find-a-ride-info">
            <h1>Find a Ride</h1>
            <p>Find a ride to your destination</p>
            <div className="find-a-ride-info-container">
                <form className="find-a-ride-info-form">
                    <div className="find-a-ride-info-form-group">
                        <label htmlFor="from">From: </label>
                        <input type="text" placeholder="From" />
                    </div>
                    <div className="find-a-ride-info-form-group">
                        <label htmlFor="to">To: </label>
                        <input type="text" placeholder="To" />
                    </div>
                    <div className="find-a-ride-info-form-group">
                        <label htmlFor="date">Date: </label>
                        <input type="date" placeholder="MM/DD/YYYY" />
                    </div>
                    <div className="find-a-ride-info-form-group">
                        <label htmlFor="seats">Seats Needed: </label>
                        <input type="number" placeholder="Seats Needed" />
                    </div>
                    <Link className='search-rides' to='/found-rides'>Search</Link>
                </form>
            </div>
        </div>
    );
}

export default FindaRideInfo;