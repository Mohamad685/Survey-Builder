const express = require("express");
const { connectToMongoDB } = require("./Configurations/config");
const User = require ("./Models/User");
const app = express();
const bodyparser = require("body-parser")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
require("dotenv").config();

app.post("/hello", (req, res) => {
  console.log("HELLO!!");

});


// auth route
const authRoutes = require("./Routes/auth");
app.use("/auth", authRoutes);

// to do routes
// const todoRoutes = require("./routes/todo.routes");
// const { authMiddleware } = require("./middlewares/auth.middleware");
// app.use("/todo", authMiddleware, todoRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  connectToMongoDB();
});
