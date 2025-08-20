var express = require('express');
var router = express.Router();
var modelProd = require('../models/product');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var _list = await modelProd.find().populate("category").populate("brand");
  res.render('index', { title: "Quản lý sản phẩm", list: _list });
});


module.exports = router;
