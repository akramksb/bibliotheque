var express = require('express');
var router = express.Router();
var {etudiant} = require('../models');

/* GET users listing. */

router.post('/', async (req, res, next) => {
  try {
    let body = req.body;
    if ( body.role == 'student')
    {
      let student = await etudiant.findOne( { where : { cne : body.cne }} );
      if (!student)
        res.json("incorrect cne")
      if (body.password == student.password)
      {
        res.json("logged-in")
        return
      }
      res.json("incorrect password")
    }
  }
  catch (err){
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;
