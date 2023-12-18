const express = require("express");
const { connectToMongoDB } = require("./Configurations/config");
const app = express();
app.use(express.json());
require("dotenv").config();

app.get("/hello", (req, res) => {
  console.log("HELLO!!");
});

// auth route
// const authRoutes = require("./routes/auth.routes");
// app.use("/auth", authRoutes);

// to do routes
// const todoRoutes = require("./routes/todo.routes");
// const { authMiddleware } = require("./middlewares/auth.middleware");
// app.use("/todo", authMiddleware, todoRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  connectToMongoDB();
});
