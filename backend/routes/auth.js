const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate request
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.role === 'manager') {
        return res.status(409).json({ message: `Email already exists with role 'manager'. Role cannot be changed for ${email}.` });
      }
      return res.status(409).json({ message: `Email already exists: ${email}. Please use another email.` });
    }

    // Save user to MongoDB
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    console.log('User registered:', { username, email, password, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists and the password matches
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login is successful
    res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
