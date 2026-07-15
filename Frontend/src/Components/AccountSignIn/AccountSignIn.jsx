import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AccountSignIn.css";

const AccountSignIn = () => {
  // State for handling input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Replace this with your actual login logic (e.g., Firebase, API call)
    if (email && password) {
      alert(`Logging in with:\nEmail: ${email}\nPassword: ${password}`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-card" onSubmit={handleSubmit}>
        
        {/* Email Input Field */}
        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input Field */}
        <div className="input-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Sign In Action Button */}
        <button type="submit" className="signin-btn">
          Sign In
        </button>

        {/* Footer Navigation Links */}
        <div className="signin-footer-links">
          <Link to="/forgot-password">Forgot your password?</Link>
          <Link to="/create-account">Create account</Link>
          <Link to="/">Return to Store</Link>
        </div>

      </form>
    </div>
  );
};

export default AccountSignIn;