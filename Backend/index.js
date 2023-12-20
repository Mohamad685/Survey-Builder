const express = require("express");
const { connectToMongoDB } = require("./Configurations/config");
const User = require ("./Models/User");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
require("dotenv").config();
const {authenticateAdmin} = require('./Middlewares/auth')


// auth route
const authRoutes = require("./Routes/auth");
app.use("/auth", authRoutes);

const surveyRoutes = require('./Routes/survey')
app.use('/api',authenticateAdmin, surveyRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  connectToMongoDB();
});
