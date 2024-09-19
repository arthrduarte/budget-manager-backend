var express = require('express');
var router = express.Router();
var db = require('../db/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

/* POST user login. */
router.post('/', function (req, res, next) {
  const { email, password } = req.body
  
  let sql = `SELECT * FROM user WHERE email = ?`
  db.get(sql, [email], (err, row) => {
    if (err)
      return res.status(500).json({ error: err.message })
    
    if (row) {
      bcrypt.compare(password, row.password_hash, (err) => {
        if (err) 
          return res.status(500).json({ error: err.message });

        const user = { id: row.id }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken})
      })
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  })
});

module.exports = router;