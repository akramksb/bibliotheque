var express = require('express');
var router = express.Router();
var {etudiant} = require('../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let allStudents = await etudiant.findAll();
  res.send(allStudents)
  console.log("request sent")
});

router.post('/', async (req, res, next) => {
  try {
    let newStudent = await etudiant.create(req.body);
    // res.send(newStudent)
    res.json(newStudent)
    console.log("New user added")
  }
  catch (err){
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;
