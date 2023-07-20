const express = require("express");
const authRouter = express.Router();

// Placeholder for storing user data. Replace this with a database in a real application.
const userDatabase = require("../database/userData.json");

// Convert the users data from JSON format to an array
const users = userDatabase.users || [];

// Middlewares to parse form data
authRouter.use(express.urlencoded({ extended: true }));

// Login route
authRouter.get("/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user with the given email (Replace this with a database query in a real application)
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Here, you should compare the provided password with the stored hashed password
  // using a password hashing library like bcrypt. For simplicity, we'll compare the hash directly.
  if (user.password_hash !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // User is authenticated, return some user data (e.g., username, email, etc.)
  return res.json({
    username: user.username,
    email: user.email,
  });
});

// Signup route
authRouter.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  // Check if the username is already taken (Replace this with a database query in a real application)
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ error: "Username already taken" });
  }

  // Here, you should hash the password using a password hashing library like bcrypt.
  // For simplicity, we'll store the hash directly in this example.
  const hashedPassword = "hashed_password_here";

  // Create a new user object
  const newUser = {
    id: users.length + 1,
    username,
    password_hash: hashedPassword,
    email,
  };

  // Add the new user to the array (Replace this with database insert in a real application)
  users.push(newUser);

  // Return some user data (e.g., username, email, etc.)
  return res.json({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
  });
});

module.exports = authRouter;
