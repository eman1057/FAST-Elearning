import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS for styling

const Login = ({ setToken }) => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });
      setToken(response.data.access); // Store token in the parent state
      setError(""); // Clear any previous error messages
      navigate("/courses"); // Redirect to /courses
    } catch (error) {
      setError("Invalid credentials. Please try again."); // Set error message
    }
  };

  return (
    <div className="base-container">
      <div className="login-container">
        {/* Login Form */}
        <div className="login-form">
          <h2>FAST E-Learning</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="signup-message">
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="signup-link">
                  Sign up
                </a>
              </p>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        {/* Image Container */}
        <div className="login-image-container"></div>
      </div>
    </div>
  );
};

export default Login;
