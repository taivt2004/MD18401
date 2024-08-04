var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var mongoose = require('mongoose')
require('./models/product')
require('./models/category')
require('./models/brand')
require('./models/user')
// require('./models/modelBanhKeo')
// require('./models/CateBanhKeo')


//var cateRouter = require('./routes/cateBanhKeoRouter')
// var brandsRouter = require('./routes/cateBanhKeoRouter')
var index = require('./routes/index')
var brandRouter = require('./routes/brandRouter')
var categoryRouter = require('./routes/categoryRouter')
var productsRouter = require('./routes/productRouter'); // Sử dụng router cho products
var userRouter = require('./routes/userRouter')

var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-config.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// view engine setup
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

//app.use('/sv', svRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoryRouter)
//app.use('/products', cateRouter )
app.use('/', index);
app.use('/products', productsRouter); // Sử dụng productsRouter cho /products
app.use('/user', userRouter)

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
