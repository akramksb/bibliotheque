const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

app.use(fileUpload())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public', {index: 'index.html'}));
app.use('/Upload', express.static('./Upload'))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/addUser', require('./routes/addUser'));
app.use('/addBook', require('./routes/addBook'));
app.use('/addLoan', require('./routes/addLoan'));
app.use('/myBooks', require('./routes/myBooks'));
app.use('/books', require('./routes/books'));


app.listen(3000);
console.log("app started at port 3000");

module.exports = app;
