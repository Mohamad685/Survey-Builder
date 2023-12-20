const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim:true,
	},

	email: {
		type: String,
		required: true,
	},

	profile_pic: {
		type: String,
	},

	user_type: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

// userSchema.pre(
// 	"save",
// 	async function (next) {
// 		try {
// 			const salt = await bcrypt.genSalt(10);
// 			this.password = await bcrypt.hash(this.password, salt);
// 			next();
// 		} catch (error) {
// 			console.log(error);
// 			next(error);
// 		}
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

const User = mongoose.model("User", userSchema);

module.exports = User;
