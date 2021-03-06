const express = require('express');
const path = require('path');
// var cookieParser = require('cookie-parser');
const router = express.Router();
const { book } = require('../models');
const controllers = require('../controllers/auth');
const { exception } = require('console');
require('dotenv').config()

/* GET users listing. */

router.get('/', controllers.requireAuth, (req, res) => {
  return controllers.sendFile(res, "addBook.html");
})

router.post('/', controllers.requireAuth, async (req, res, next) => {
  if (req.user.role !== "admin")
    return;
  // let uploadPath = path.join(__dirname , "./Upload/BookCovers")
  let uploadPath = "./Upload/BookCovers/";

  let { image, details } = req.files;

  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400);
  try {
    let data = JSON.parse(details.data);
    if (image) {
      let name_ext = image.name.split(".");
      data.image = `${data.isbn}.` + name_ext[name_ext.length - 1]
      uploadPath += data.image;
      req.files.image.mv(uploadPath, (err) => {
        if (err)
          data.err = err;
      })
    }
    if (data.err)
      throw (data.err)

    let newBook = await book.create(data);

    return res.send(newBook);
  }
  catch (err) {
    res.status(400);
    res.send(err.errors)
  }
});

module.exports = router;