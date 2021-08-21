const express = require('express');
const controllers = require('../controllers/auth')
const {etudiant} = require('../models');

const router = express.Router();

/* GET users listing. */
router.get('/', controllers.authenticateToken , async (req, res, next) => {
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