const express = require('express');
const jwt = require('jsonwebtoken');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const {etudiant} = require('../models');
require('dotenv').config()

/* GET users listing. */

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
      console.log('hi')
    }
  }
  catch (err){
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;
