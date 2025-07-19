import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

function SignUpIn() {
    const [showSignIn, setShowSignIn] = useState(true);
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault();
        // TODO: Add real authentication logic here
        setIsSignedIn(true);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // TODO: Add real sign up logic here
        setIsSignedIn(true);
    };

    if (isSignedIn) {
        return (
            <div className="su-outer-container">
                <div className="su-inner-container">
                    <div className="su-card">
                        <h1 className="su-title">Welcome!</h1>
                        <button className="su-button" onClick={() => setIsSignedIn(false)}>Sign Out</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="su-outer-container">
            <div className="su-inner-container">
                <div className="su-card">
                    <div className="su-title-container">
                        <h1 className="su-title">{showSignIn ? 'Sign In' : 'Sign Up'}</h1>
                    </div>
                    {showSignIn ? (
                        <form className="su-form" onSubmit={handleSignIn}>
                            <div className="su-form-group">
                                <label className="su-label">Email:</label>
                                <input type="text" placeholder="Email" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Password:</label>
                                <input type="password" placeholder="Password" className="su-input" />
                            </div>
                            <button type="submit" className="su-button">Sign In</button>
                        </form>
                    ) : (
                        <form className="su-form" onSubmit={handleSignUp}>
                            <div className="su-form-group">
                                <label className="su-label">First name:</label>
                                <input type="text" placeholder="First name" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Last name:</label>
                                <input type="text" placeholder="Last name" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Email:</label>
                                <input type="text" placeholder="Email" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Password:</label>
                                <input type="password" placeholder="Password" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Confirm Password:</label>
                                <input type="password" placeholder="Confirm Password" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Car Model:</label>
                                <input type="text" placeholder="Car Model" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Car Color:</label>
                                <input type="text" placeholder="Car Color" className="su-input" />
                            </div>
                            <button type="submit" className="su-button">Sign Up</button>
                        </form>
                    )}
                    <div className="su-toggle-container">
                        {showSignIn ? (
                            <p className="su-toggle-text">
                                Don't have an account?{' '}
                                <button type="button" onClick={() => setShowSignIn(false)} className="su-toggle-button">Sign Up</button>
                            </p>
                        ) : (
                            <p className="su-toggle-text">
                                Already have an account?{' '}
                                <button type="button" onClick={() => setShowSignIn(true)} className="su-toggle-button">Sign In</button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpIn;