const express = require('express');
const controllers = require('../controllers/auth')
const {etudiant, admin, book} = require('../models');

const router = express.Router();

/* GET users listing. */

router.get('/', controllers.requireAuth, (req, res) =>{
  return controllers.sendFile(res, "myBooks.html");
})

router.get('/all', controllers.authenticateToken , async (req, res, next) => {
  if (req.user.role !== "student" )
    res.sendStatus(401)

  let data = req.body
  let student = await etudiant.findOne( { where : { id : req.user.id } } );
  // let livre = await book.findOne( { where : { isbn : data.bookId }} );
  let myBooks = await student.getBooks( {through : { where : 
    { etudiantId : req.user.id
    } }} );
  res.send( myBooks )
});

module.exports = router;