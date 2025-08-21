// app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connection = require('./db.js');
const brandRouter = require('./routes/brandRouter/brandRouter.js');
const categoryRouter = require('./routes/cateRouter/categoryRouter.js');
const productsRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// Routes
app.use('/brands', brandRouter);
app.use('/categories', categoryRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
