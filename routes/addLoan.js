const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const {etudiant, admin, bookEtudiant,book } = require('../models');
const controllers = require('../controllers/auth')
require('dotenv').config()

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


/* GET users listing. */

router.get('/', controllers.requireAuth, (req, res) =>{
  return controllers.sendFile(res, "addLoan.html");
})

router.post('/', controllers.requireAuth ,async (req, res, next) => {
  let data = req.body
  // console.log(data)
  try {
    let student = await etudiant.findOne( { where : { cne : data.etudiantId } } );
    if (!student)
    {
      res.status(400);
      return res.json( {error : "cne n'existe pas"} );
    }

    let livre = await book.findOne( { where : { isbn : data.bookId }} );
    if ( !livre )
    {
      res.status(400);
      return res.json( {error : "isbn n'existe pas"} );
    }
    
    let r , hasBook;

    // let r = await student.getBooks();
    
    hasBook = await student.getBooks( {through : { where : 
                                                    { bookId : livre.id
                                                    } }} );
    

    // let r = await student.getBooks( {through : { where : 
    //                                                 { delai : { [Op.lt] : 145 }
    //                                                 } }} );

    // get books past delai
    // let r = await student.getBooks( {through : { where : 
    //                                                 { date : { [Op.lte] : (new Date() - Sequelize.col('delai')) }
    //                                                 } }} );


    // console.log("> hello 1");
    //check if hasBook is empty
    if (Object.keys(hasBook).length === 0 )
    {
      r = await student.addBook( livre , {through : { date:data.date, delai:data.delai }} );
      if ( livre.dataValues.qteStock <= 0 )
      {
        res.status(400);
        return res.json( {error : "ce livre est en rupture de stock"} );
      }

      //update book
      livre.dataValues.qteStock--
      book.update(
        livre.dataValues,
        {
          where: { id : livre.dataValues.id }
        }
      )
      return res.json(r)
    }
    else
    {
      res.status(400);
      return res.json({error : "l'etudiant a déjà ce livre"});
    }
    
  }
  catch (err){
    console.log(err)
    res.status(500);
    res.json(err.name)
  }
});

module.exports = router;