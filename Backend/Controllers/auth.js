const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const config = require("../Configurations/config");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Set the destination folder for uploaded profile pictures
		cb(null, "uploads/profile_pics");
	},
	filename: (req, file, cb) => {
		// Generate a unique filename for the uploaded profile picture
		const fileName = `profile_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, fileName);
	},
});

// Multer upload configuration
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 },
	fileFilter: (req, file, cb) => {
		// Define allowed file types for profile pictures
		const allowedFileTypes = /jpeg|jpg|png/;
		const extname = allowedFileTypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = allowedFileTypes.test(file.mimetype);

		if (extname && mimetype) {
			// Accept the file if it has an allowed extension and mimetype
			return cb(null, true);
		} else {
			// Reject the file if it's not an allowed image type
			cb("Error: Only images (jpeg, jpg, png) are allowed!");
		}
	},
}).single("profile_pic"); // 'profile_pic' is the field name in the form

async function createAdmin() {
	try {
		// Check if an admin user already exists
		const existingAdmin = await User.findOne({ username: "admin" });

		if (!existingAdmin) {
			const adminHashedPassword = await bcrypt.hash("123456789", 10);
			
			const newAdmin = new User({
				username: "admin",
				password: adminHashedPassword ,
				email: "admin@new.com", 
				profile_pic: null,
				user_type: "admin",
			});

			await newAdmin.save();
			console.log("Admin user created successfully");
		} else {
			console.log("Admin user already exists");
		}
	} catch (error) {
		console.error("Error creating admin user:", error);
	}
}

createAdmin();

async function signup(req, res) {
	try {
		// Handle file upload using multer middleware
		upload(req, res, async function (err) {
			if (err) {
				// Return an error response if file upload fails
				return res.status(400).json({ message: err });
			}

			// Extract user information from the request body
			const { username, password, email } = req.body;
			// Extract the filename of the uploaded profile picture (if any)
			const profile_pic = req.file ? req.file.filename : null;

			// Check if the username is already taken
			const existingUser = await User.findOne({ username });
			if (existingUser) {
				return res.status(400).json({ message: "Username is already taken" });
			}

			// Hash the password before saving it to the database
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create a new user with the provided information
			const newUser = new User({
				username,
				password: hashedPassword,
				email,
				profile_pic,
			});
			await newUser.save();

			// // Return a success response
			res.status(201).json({ message: "User registered successfully" });
		});
	} catch (error) {
		// Handle internal server errors
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function signin(req, res) {
	try {
		// Extract username and password from the request body
		const { username, password } = req.body;

		// Check if the user exists in the database
		const user = await User.findOne({ username });
		if (!user) {
			// Return an error response if the user is not found
			return res.status(401).json({ message: "Username not found" });
		}

		// Check if the provided password is valid
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			// Return an error response if the password is invalid
			return res.status(401).json({ message: "Incorrect password" });
		}

		// Create and sign a JWT token for authentication
		const token = jwt.sign(
			{ user: { id: user._id, username: user.username, role: user.user_type} },
			process.env.JWT_SECRET,
			{
				expiresIn: "10h",
			}
		);

		// Return the JWT token in the response
		res.json({ token });
	} catch (error) {
		// Handle internal server errors
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

// Export the functions to make them available to other parts of the application
module.exports = { signup, signin };
