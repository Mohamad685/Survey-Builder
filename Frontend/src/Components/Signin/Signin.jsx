import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    // Check if username or password is empty
    if (!username || !password) {
      setError("Username or password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/signin", {
        username,
        password,
      });

      // If successful, store the token securely (e.g., in local storage)
      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("Sign-in successful");

      // Reset the username and password after successful sign-in
      setUsername("");
      setPassword("");
      // Clear any previous error messages
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Username or Password Incorrect");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="error-message">{error}</p>}

      <button className="signup-button" onClick={handleSignIn}>
        Sign In
      </button>

      <Link to="/SignUp">Don't Have Account? Register</Link>
    </div>
  );
};

export default SignIn;
