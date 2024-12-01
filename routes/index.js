var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ message: 'Welcome to Car information API. Use /cars route for API operations' });
});

module.exports = router;
