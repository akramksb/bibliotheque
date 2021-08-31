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

router.post('/', controllers.requireAuth ,async (req, res, next) => {
  if (req.user.role !== "admin")
    return;
  // let uploadPath = path.join(__dirname , "./Upload/BookCovers")
  let uploadPath = "./Upload/BookCovers/";

  let {image, details} = req.files;

  if ( !req.files || Object.keys(req.files).length === 0)
    return res.status(400);
  try {
    let data = JSON.parse( details.data ); 
    if (image)
    {
      let name_ext = image.name.split(".");
      uploadPath += `${data.isbn}.` + name_ext[name_ext.length-1];
      req.files.image.mv( uploadPath , (err)=>{
        if (err) 
          return res.status(500).send(err);
      })
    }
    return res.send(req.files);
  }
  catch (err){
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;