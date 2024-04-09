var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/app', function(req, res, next) {
  res.send('respond with a resource app');
});

module.exports = router;
