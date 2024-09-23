const express = require('express');
const router = express.Router();
const db = require('../db/db')
const isAuthenticated = require('./middleware');

/* GET home page. */
router.get('/', isAuthenticated, function (req, res, next) {
  let sql = "SELECT first_name, last_name, email FROM user WHERE id = ?"

  db.all(sql, [req.user.id], (err, data) => {
    if (err)
      return res.status(404).json({ error: err.message })

    res.json(data)
  })
});

module.exports = router;