const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const {etudiant, admin} = require('../models');
const controllers = require('../controllers/auth')
require('dotenv').config()

/* GET users listing. */

router.get('/', (req, res) =>{
  let isLoggedIn = controllers.isLoggedIn(req)
  if (!isLoggedIn)
  {
    return controllers.sendFile(res, "login.html");
  }
  if (req.user.role == "student")
    res.redirect("/student")
    if (req.user.role == "admin")
    res.redirect("/admin")
})

router.post('/', async (req, res, next) => {
  try {
    let body = req.body;
    let payload = {};
    if ( body.role == 'student')
    {
      let student = await etudiant.findOne( { where : { cne : body.cne }} );
      if (!student || body.password !== student.password)
      return res.json("incorrect cne or password")
      payload = { id : student.id , role : "student" }
    }
    else if ( body.role == 'admin')
    {
      let user = await admin.findOne( { where : { username : body.username }} );
      if (!user || body.password !== user.password)
      return res.json("incorrect username or password")
      payload = { id : user.id , role : "admin" }
      
    }
    const token = jwt.sign( payload , process.env.JWT_SECRET_TOKEN )
    res.cookie('jwt', token, {httpOnly : true})
    payload.token = token;
    res.json( payload )
  }
  catch (err){
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;