const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

require('./models/product');
require('./models/category');
require('./models/brand.js');
require('./models/user');
require('./models/ThiModel.js')

const indexRouter = require('./routes/index');
const brandRouter = require('./routes/brandRouter.js');
const categoryRouter = require('./routes/categoryRouter');
const productsRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');


const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://vtt2004abc:H4wiRWIlgldAD76P@taivt.mtwazra.mongodb.net/db_phonestore', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);
//app.use('/giaothong', ThiRouter)
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
