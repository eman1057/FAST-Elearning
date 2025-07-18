import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = ({ onSignupSuccess = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        password,
      });
      alert("Signup successful! You can now log in.");
      onSignupSuccess();
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="base-container">
      <div className="signup-container">
        <div className="signup-form">
          <h2>FAST E-Learning</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="l2nnnnn@lhr.nu.edu.pk"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Sign up
            </button>
          </form>
        </div>

        <div className="signup-image-container"></div>
      </div>
    </div>
  );
};

export default Signup;
