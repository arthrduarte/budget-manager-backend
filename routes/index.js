var express = require('express');
var router = express.Router();
var db = require('../db/db')

/* GET home page. */
router.get('/', function (req, res, next) {
  let sql = "SELECT * FROM expense"

  db.all(sql, [], (err, data)=>{
    if(err)
      return console.error(err.message)

    res.json(data)
  })
});

module.exports = router;