const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const {etudiant, admin} = require('../models');
const controllers = require('../controllers/auth')
require('dotenv').config()

/* GET users listing. */

router.get('/', controllers.requireAuth, (req, res) =>{
  return controllers.sendFile(res, "addBook.html");
})

// router.post('/', controllers.requireAuth ,async (req, res, next) => {
//   let data = req.body
//   console.log(data)
//   try {
//     if ( data.role == 'student')
//     {
//       let student = await etudiant.create(data);
//       return res.json(student)
//     }
//     else if ( data.role == 'admin')
//     {
//       let user = await admin.create( data );
//       return res.json(user)
      
//     }
//   }
//   catch (err){
//     res.status(400);
//     res.send(err.errors)
//   }
// });

module.exports = router;