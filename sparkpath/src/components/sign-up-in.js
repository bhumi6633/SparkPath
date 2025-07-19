import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';

function SignUpIn() {
    const [showSignIn, setShowSignIn] = useState(true);
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault();
        // TODO: Add real authentication logic here
        setIsSignedIn(true);
    };

    const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    car_model: '',
    car_color: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        // TODO: Add real sign up logic here
        try{
            const response = await axios.post("http://127.0.0.1:5000/auth/signup", formData);
            console.log(response.data);
            setIsSignedIn(true);
        } catch (error) {
            console.error("Signup Failed: ", error.response?.data || error.message);
            alert("Signup failed...")
        }
        
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
                                <input name="first_name" value={formData.first_name} onChange={handleChange} type="text" placeholder="First name" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Last name:</label>
                                <input name="last_name" value={formData.last_name} onChange={handleChange} type="text" placeholder="Last name" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Email:</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="text" placeholder="Email" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Password:</label>
                                <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Confirm Password:</label>
                                <input name="confirm_password" value={formData.confirm_password} onChange={handleChange} type="password" placeholder="Confirm Password" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Car Model:</label>
                                <input name="car_model" value={formData.car_model} onChange={handleChange} type="text" placeholder="Car Model" className="su-input" />
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Car Color:</label>
                                <input name="car_color" value={formData.car_color} onChange={handleChange}  type="text" placeholder="Car Color" className="su-input" />
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