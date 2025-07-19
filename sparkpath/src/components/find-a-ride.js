import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function FindaRideInfo() {
    const { isSignedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (isSignedIn) {
            navigate('/found-rides');
        }
    };

    return (
        <div className="find-a-ride-info">
            <h1>Find a Ride</h1>
            <p>Find a ride to your destination</p>
            <div className="find-a-ride-info-container">
                <form className="find-a-ride-info-form" onSubmit={handleSearch}>
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
                    <button className='search-rides' type='submit' disabled={!isSignedIn} title={!isSignedIn ? 'Please sign in to search' : ''}>Search</button>
                    {!isSignedIn && <div style={{color: 'red', marginTop: 8}}>You must be signed in to search for rides.</div>}
                </form>
            </div>
        </div>
    );
}

export default FindaRideInfo;