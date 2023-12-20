import "./Signup.css";
import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setProfilePicture(file);
	};

	const handleSignUp = async () => {
		if (!username || !password || !email || !profilePicture) {
			setErrorMessage("All fields are mandatory");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("username", username);
			formData.append("password", password);
			formData.append("email", email);
			formData.append("profile_pic", profilePicture);

			const response = await axios.post(
				"http://localhost:8000/auth/signup",
				formData
			);

			setUsername("");
			setPassword("");
			setEmail("");
			setProfilePicture(null);
			setErrorMessage("");
			console.log("Signup successful:", response.data);
		} catch (error) {
			console.error(
				"Error signing up:",
				error.response ? error.response.data : error.message
			);
		}
	};

	return (
		<div className="sign-up">
			<h1>Create Account</h1>
			<input
				id="username"
				type="text"
				placeholder="Username"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<p>Upload Profile Picture:</p>
			<input
				type="file"
				id="profilePicture"
				name="profilePicture"
				accept="image/*"
				onChange={handleFileChange}
				className="image-input"
			/>
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

			<button
				onClick={handleSignUp}
				className="signup-button">
				Sign Up
			</button>
		</div>
	);
};

export default SignUp;
