import React from 'react';
import { Link } from 'react-router-dom';

function PostRideConfirm() {
    return (
        <div className="post-ride-confirm-page">
            <div className="post-ride-confirm-card">
                <div className="post-ride-confirm-content">
                    <div className="success-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#059669" strokeWidth="2" fill="#e0f7ef"/>
                            <path d="M9 12l2 2 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h1 className="post-ride-confirm-title">Ride Successfully Posted!</h1>
                    <p className="post-ride-confirm-message">
                        Your ride has been successfully posted and is now available for other users to find. 
                        Thank you for contributing to sustainable transportation!
                    </p>
                    <div className="post-ride-confirm-actions">
                        <Link to="/home" className="post-ride-confirm-button">
                            Back to Home
                        </Link>
                        <Link to="/find-a-ride" className="post-ride-confirm-button secondary">
                            Find a Ride
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostRideConfirm;