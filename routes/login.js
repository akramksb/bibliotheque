const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const {etudiant} = require('../models');
const controllers = require('../controllers/auth')
require('dotenv').config()

/* GET users listing. */

router.get('/', (req, res) =>{
  let isLoggedIn = controllers.isLoggedIn(req)
  if (!isLoggedIn)
  {
    return res.sendFile( path.join( __dirname , "../public/login.html" ) );
  }
  res.json({ isLoggedIn })
})

router.post('/', async (req, res, next) => {
  try {
    let body = req.body;
    if ( body.role == 'student')
    {
      let student = await etudiant.findOne( { where : { cne : body.cne }} );
      if (!student || body.password !== student.password)
        return res.json("incorrect cne or password")
      
      // res.json(`logged-in as ${student.username}`)
      const token = jwt.sign( { id : student.id } , process.env.JWT_SECRET_TOKEN )
      res.cookie('jwt', token, {httpOnly : true})
      res.json( { student: student.id, token } )
    }
  }
  catch (err){
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;