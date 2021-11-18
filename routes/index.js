const express = require('express');
const router = express.Router();
const controllers = require("../controllers/auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  
});

router.get('/reg', function(req, res, next) {
  // res.redirect("/login.html");
  res.redirect('./test.html');
});


router.get('/student', controllers.requireAuth ,(req, res)=>{
  if (req.user.role !== "student" )
    res.sendStatus(401)
  return controllers.sendFile(res, "student.html")
})

router.get('/admin', controllers.requireAuth ,(req, res)=>{
  if (req.user.role !== "admin" )
    res.sendStatus(401)
  return controllers.sendFile(res, "admin.html")
})

router.get('/browse', controllers.requireAuth, async (req, res) => {
  return controllers.sendFile(res, "browse.html");
})

router.get('/logout', controllers.requireAuth ,(req, res)=>{
  return controllers.logout(res)
})


module.exports = router;