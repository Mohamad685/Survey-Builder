import "./Signup.css";
import React, { useState } from "react";

const SignUp = ({ onToggle }) => {
	const [profilePicture, setProfilePicture] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setProfilePicture(file);
	};

	const handleSignUp = () => {
		// Handle the signup logic, including the profilePicture state
		console.log("User signed up with profile picture:", profilePicture);
	};

	return (
		<div className="sign-up">
				<h1>Create Account</h1>
				<input
					type="text"
					placeholder="Userame"
				/>
				<input
					type="email"
					placeholder="Email"
				/>
				<input
					type="password"
					placeholder="Password"
				/>
				<label htmlFor="profilePicture">Upload Profile Picture:</label>
				<input
					type="file"
					id="profilePicture"
					name="profilePicture"
					accept="image/*"
					onChange={handleFileChange}
          className="image-input"
				/>
				<button onClick={handleSignUp} className="signup-button">Sign Up</button>
			
		</div>
	);
};

export default SignUp;
