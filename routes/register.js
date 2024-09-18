const express = require('express');
const router = express.Router();
const db = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config();

/* POST user registration. */
router.post('/', async function (req, res, next) {
    const { first_name, last_name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    let sql = `INSERT INTO user (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`
    db.run(sql, [first_name, last_name, email, hashedPassword], function (err) {
        if (err)
            return res.status(500).json({ error: err.message })

        const user = { id: this.lastID }
        console.log(user)
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({ message: 'User registered', accessToken: accessToken })
    })
});

module.exports = router;