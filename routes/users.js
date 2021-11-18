const express = require('express');
const controllers = require('../controllers/auth')
const {etudiant, admin} = require('../models');

const router = express.Router();

/* GET users listing. */
router.get('/', controllers.authenticateToken , async (req, res, next) => {
  if (req.user.role !== "admin" )
    res.sendStatus(401)
  let allStudents = await etudiant.findAll();
  res.send(allStudents)
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

router.get('/current', controllers.authenticateToken , async (req, res, next) => {
  let user;
  if ( req.user.role == "student" )
    user = await etudiant.findOne( { where : { "id" : req.user.id } } );
  if ( req.user.role == "admin" )
    user = await admin.findOne( { where : { "id" : req.user.id } } );
  
  user.dataValues.role = req.user.role
  delete user.dataValues.password
  res.json( user );
  // console.log(user)
});

router.get("/students/:cne?", async (req, res) => {
  let user = await etudiant.findOne( { where : { "cne" : req.params.cne } } );
  if (!user)
  {
    res.json(null)
  }
  else
    res.json(user.id)
})

router.get("/admins/:username?", async (req, res) => {
  let user = await admin.findOne( { where : { "username" : req.params.username } } );
  if (!user)
  {
    res.json(null)
  }
  res.json(user.id)
})

module.exports = router;