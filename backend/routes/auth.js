const express = require('express');
const router = express.Router();

// Simulated database (in-memory)
let users = [];

// Register route
router.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate request
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    if (existingUser.role === 'manager') {
      return res.status(409).json({ message: `Email already exists with role 'manager'. Role cannot be changed for ${email}.` });
    }
    return res.status(409).json({ message: `Email already exists: ${email}. Please use another email.` });
  }

  // Save user to array
  users.push({ username, email, password, role });
  console.log('User registered:', { username, email, password, role });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check if the user exists and the password matches
  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // If login is successful
  res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, role: user.role } });
});

module.exports = router;
