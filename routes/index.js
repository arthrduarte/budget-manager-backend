const express = require('express');
const router = express.Router();
const db = require('../db/db')
const authenticateToken = require('./middleware');

/* GET home page. */
router.get('/', authenticateToken, function (req, res, next) {
  console.log("chegamos no index")
  let sql = "SELECT * FROM expense WHERE user_id = ?"

  db.all(sql, [req.user.id], (err, data) => {
    if (err)
      return res.status(404).json({ error: err.message })

    res.json(data)
  })
});

module.exports = router;