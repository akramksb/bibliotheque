const express = require('express');
const path = require('path');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const { book } = require('../models');
const controllers = require('../controllers/auth')
require('dotenv').config()

/* GET users listing. */

router.get('/', controllers.requireAuth, async (req, res) => {
  let booklist = await book.findAll();
  return res.json(booklist);
})


module.exports = router;