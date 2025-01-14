import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignup = async (userData) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to signup');
            }

            const result = await response.json();
            console.log('Signup successful:', result);
            // Handle successful signup, e.g., redirect to login page
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
