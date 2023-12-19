import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Signin.css";

const SignIn = ({ onToggle }) => {
  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button className="signup-button" onClick={() => onToggle("register")}>
        Sign In
      </button>

      <Link to="/SignUp">Don't Have Account? Register</Link>
    </div>
  );
};

export default SignIn;
