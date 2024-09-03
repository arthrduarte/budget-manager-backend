var express = require('express');
var router = express.Router();
var db = require('../db/db')

/* GET home page. */
router.get('/', function (req, res, next) {
  let sql = "SELECT * FROM expense"

  db.all(sql, [], (err, rows)=>{
    if(err)
      return console.error(err.message)

    res.json(rows)
  })
});

module.exports = router;