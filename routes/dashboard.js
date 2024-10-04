const express = require('express');
const User = require('../models/userModel')
const router = express.Router();
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET home page. */
router.get('/', isAuthenticated, async (req, res, next) =>{
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log(user)
    return res.status(200).json({ first_name: user.first_name, });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
});

module.exports = router;