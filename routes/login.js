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
  db.get(sql, [email], async (err, row) => {
    if (err)
      return res.status(500).json({ error: err.message })

    if (row) {
      console.log(row)
      const match = await bcrypt.compare(password, row.password_hash)
      console.log(match)
      if (!match)
        return res.status(500).json({ error: 'Incorrect password' });

      const user = { id: row.id }
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      return res.status(200).json({ accessToken: accessToken })
    } else {
      res.status(404).json({ error: 'Email not registered' });
    }
  })
});

module.exports = router;