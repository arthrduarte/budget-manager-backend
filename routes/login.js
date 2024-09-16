var express = require('express');
var router = express.Router();
var db = require('../db/db')

/* POST user login. */
router.post('/', function(req, res, next) {
  console.log(req.body)

  res.json(req.body)
});

module.exports = router;