import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';

function SignUpIn() {
    const [showSignIn, setShowSignIn] = useState(true);
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    // Sign in form data
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });

    // Sign up form data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        car_model: '',
        car_color: '',
    });

    const handleSignInChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateSignIn = () => {
        const newErrors = {};
        if (!signInData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!signInData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSignUp = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        if (!formData.confirm_password.trim()) {
            newErrors.confirm_password = 'Confirm password is required';
        }
        if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
        }
        if (!formData.car_model.trim()) {
            newErrors.car_model = 'Car model is required';
        }
        if (!formData.car_color.trim()) {
            newErrors.car_color = 'Car color is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        if (validateSignIn()) {
            // TODO: Add real authentication logic here
            setIsSignedIn(true);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (validateSignUp()) {
            try {
                const response = await axios.post("http://127.0.0.1:5000/auth/signup", formData);
                console.log(response.data);
                setIsSignedIn(true);
            } catch (error) {
                console.error("Signup Failed: ", error.response?.data || error.message);
                alert("Signup failed...")
            }
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
                                <input 
                                    name="email"
                                    value={signInData.email} 
                                    onChange={handleSignInChange}
                                    type="email" 
                                    placeholder="Email" 
                                    className={`su-input ${errors.email ? 'error' : ''}`}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Password:</label>
                                <input 
                                    name="password"
                                    value={signInData.password} 
                                    onChange={handleSignInChange}
                                    type="password" 
                                    placeholder="Password" 
                                    className={`su-input ${errors.password ? 'error' : ''}`}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>
                            <button type="submit" className="su-button">Sign In</button>
                        </form>
                    ) : (
                        <form className="su-form" onSubmit={handleSignUp}>
                            <div className="su-form-group">
                                <label className="su-label">First name:</label>
                                <input 
                                    name="first_name" 
                                    value={formData.first_name} 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="First name" 
                                    className={`su-input ${errors.first_name ? 'error' : ''}`}
                                />
                                {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Last name:</label>
                                <input 
                                    name="last_name" 
                                    value={formData.last_name} 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Last name" 
                                    className={`su-input ${errors.last_name ? 'error' : ''}`}
                                />
                                {errors.last_name && <span className="error-message">{errors.last_name}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Email:</label>
                                <input 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    type="email" 
                                    placeholder="Email" 
                                    className={`su-input ${errors.email ? 'error' : ''}`}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Password:</label>
                                <input 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    type="password" 
                                    placeholder="Password" 
                                    className={`su-input ${errors.password ? 'error' : ''}`}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Confirm Password:</label>
                                <input 
                                    name="confirm_password" 
                                    value={formData.confirm_password} 
                                    onChange={handleChange} 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    className={`su-input ${errors.confirm_password ? 'error' : ''}`}
                                />
                                {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Car Model:</label>
                                <input 
                                    name="car_model" 
                                    value={formData.car_model} 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Car Model" 
                                    className={`su-input ${errors.car_model ? 'error' : ''}`}
                                />
                                {errors.car_model && <span className="error-message">{errors.car_model}</span>}
                            </div>
                            <div className="su-form-group">
                                <label className="su-label">Car Color:</label>
                                <input 
                                    name="car_color" 
                                    value={formData.car_color} 
                                    onChange={handleChange}  
                                    type="text" 
                                    placeholder="Car Color" 
                                    className={`su-input ${errors.car_color ? 'error' : ''}`}
                                />
                                {errors.car_color && <span className="error-message">{errors.car_color}</span>}
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