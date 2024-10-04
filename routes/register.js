const express = require('express');
const router = express.Router();
const db = require('../db/db')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config();

/* POST user registration. */
router.post('/', async function (req, res, next) {
    const { first_name, last_name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const user = new User({ first_name, last_name, email, password: hashedPassword })
        await user.save()

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ accessToken });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;