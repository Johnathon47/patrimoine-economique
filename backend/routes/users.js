var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/example', function(req, res, next) {
  res.send('respond with a example');
});

module.exports = router;
