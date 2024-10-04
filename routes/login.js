const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

/* POST user login. */
router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log((user));
    if (!user) {
      return res.status(400).json({ error: "Email not registered" });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ accessToken });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;