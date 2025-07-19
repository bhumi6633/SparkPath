import React from 'react';

const signIn = (
    <form className="su-form">
        <div className="su-form-group">
            <label htmlFor='email' className="su-label">Email:</label>
            <input 
                type='text' 
                placeholder='Email' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='password' className="su-label">Password:</label>
            <input 
                type='password' 
                placeholder='Password' 
                className="su-input"
            />
        </div>
        <button 
            type='submit' 
            className="su-button"
        >
            Sign In
        </button>
    </form>
);

const signUp = (
    <form className="su-form">
        <div className="su-form-group">
            <label htmlFor='First name' className="su-label">First name:</label>
            <input 
                type='text' 
                placeholder='First name' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='Last name' className="su-label">Last name:</label>
            <input 
                type='text' 
                placeholder='Last name' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='email' className="su-label">Email:</label>
            <input 
                type='text' 
                placeholder='Email' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='password' className="su-label">Password:</label>
            <input 
                type='password' 
                placeholder='Password' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='confirmPassword' className="su-label">Confirm Password:</label>
            <input 
                type='password' 
                placeholder='Confirm Password' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='Car Model' className="su-label">Car Model:</label>
            <input 
                type='text' 
                placeholder='Car Model' 
                className="su-input"
            />
        </div>
        <div className="su-form-group">
            <label htmlFor='Car Color' className="su-label">Car Color:</label>
            <input 
                type='text' 
                placeholder='Car Color' 
                className="su-input"
            />
        </div>
        <button 
            type='submit' 
            className="su-button"
        >
            Sign Up
        </button>
    </form>
);

function SignUp(props) {
    return (
        <div className="su-outer-container">
            <div className="su-inner-container">
                <div className="su-card">
                    <div className="su-title-container">
                        {props.signIn ? (
                            <h1 className="su-title">Sign In</h1>
                        ) : (
                            <h1 className="su-title">Sign Up</h1>
                        )}
                    </div>
                    {props.signIn ? signIn : signUp}
                    {/* Toggle buttons */}
                    <div className="su-toggle-container">
                        {props.signIn ? (
                            <p className="su-toggle-text">
                                Don't have an account?{' '}
                                <button 
                                    onClick={() => props.setSignIn(false)}
                                    className="su-toggle-button"
                                >
                                    Sign Up
                                </button>
                            </p>
                        ) : (
                            <p className="su-toggle-text">
                                Already have an account?{' '}
                                <button 
                                    onClick={() => props.setSignIn(true)}
                                    className="su-toggle-button"
                                >
                                    Sign In
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;