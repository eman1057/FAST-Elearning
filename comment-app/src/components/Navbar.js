import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">FAST E-Learning</div>
      <div className="navbar-links">
        <Link to="/">Home</Link> {/* Updated Home Link */}
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/alumni">Alumni</Link>
        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
        <button className="signup-btn" onClick={handleSignupClick}>
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
