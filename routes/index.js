var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect("/login.html");
  res.render('index', { title: 'Express' });

});

router.get('/reg', function(req, res, next) {
  // res.redirect("/login.html");
  res.redirect('./test.html');
});

module.exports = router;
