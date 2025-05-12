import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './css/Login.css';``

const Login = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!credentials.email.includes('@')) newErrors.email = 'Valid email is required';
        if (credentials.password.length < 6) newErrors.password = 'Password must be at least 6 characters!';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log("Login credentials valid. You'll call backend here using Axios");
        // Placeholder: Call login API here

        const loginData = {
                email: credentials.email,
                password: credentials.password
            };

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok && data) {
                localStorage.setItem("user", JSON.stringify(data));
                alert("Login successful!");
                navigate("/home");
            } else {
                alert("Invalid credentials!");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="login-container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit} className = "login-form">
                <label>Email:</label>
                <input type="email" name="email" value={credentials.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}

                <label>Password:</label>
                <input type='password' name='password' value={credentials.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}

                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;