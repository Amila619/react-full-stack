const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { reqInfo } = require("./middleware/reqInfo");
const { userModel } = require("./models/User");

const port = process.env.PORT || 8080;
const uri = process.env.URI;

app.use(express.json());
app.use(cors()); // Fixed missing parentheses
app.use(reqInfo);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/send", (req, res) => {
  const username = "Helium";
  const password = "Json";
  res.redirect(
    `http://localhost:3000/?username=${username}&password=${password}`
  );
});

app.post("/submit", async (req, res) => {
  try {
    const { username, password } = req.body;

    const createUser = await userModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "Successfully Registered",
      user: createUser, // Optional: return the created user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.listen(port, async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database successfully connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
  console.log(`Server running on http://localhost:${port}`);
});
