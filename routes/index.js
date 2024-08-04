var express = require('express');
var router = express.Router();
var modelCate = require('../models/category');
var modelBrands = require('../models/brand');
var modelProd = require('../models/product');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var _list = await modelProd.find().populate("category").populate("brand");
  res.render('index', {title: "Quản lý sản phẩm", list: _list });
});

// Thêm
router.get('/add', async function(req, res, next) {
  var listCate = await modelCate.find();  
  var listBrand = await modelBrands.find();
  res.render('add', {listCate: listCate, listBrand: listBrand });
});
//vào trang sửa
router.get('/edit/:id', async function(req, res, next) {
  const {id} = req.params;
  const product = await modelProd.findById(id).populate("category").populate("brand");
  const listCate = await modelCate.find();
  const listBrand = await modelBrands.find();
  res.render('edit', {product: product, listCate: listCate, listBrand, listBrand});
})
// Xử lý form sửa sản phẩm
router.post('/edit-product/:id', async function(req, res, next){
  const {id} = req.params;
  const {
    name, 
    price, 
    title, 
    image, 
    brand,
    category,
    man_hinh,
    he_dieu_hanh,
    chip,
    pin,
    hang,
    camera_truoc,
    camera_sau,
    anh_chi_tiet_sp,
    ram,
    luu_tru,
    gia,
    ma_mau,
    ten_mau,
    anh_mau
  } = req.body;

  const chi_tiet_sp = {
    man_hinh,
    anh_chi_tiet_sp: Array.isArray(anh_chi_tiet_sp) ? anh_chi_tiet_sp : [anh_chi_tiet_sp],
    he_dieu_hanh,
    dung_luong_Gia: Array.isArray(ram) ? ram.map((_, i) => ({
      ram: ram[i],
      luu_tru: luu_tru[i],
      gia: gia[i]
    })) : [{
      ram,
      luu_tru,
      gia
    }],
    mau_sac: Array.isArray(ma_mau) ? ma_mau.map((_, i) => ({
      ma: ma_mau[i],
      ten: ten_mau[i],
      anh: anh_mau[i]
    })) : [{
      ma: ma_mau,
      ten: ten_mau,
      anh: anh_mau
    }],
    chip,
    pin,
    hang,
    camera: [{
      camera_truoc,
      camera_sau
    }]
  };

  const updatedProduct = {
    name,
    price,
    title,
    image,
    brand,
    category,
    chi_tiet_sp
  };

  await modelProd.findByIdAndUpdate(id, updatedProduct);
  res.redirect("/");
});




// Xử lý form trang thêm
router.post('/add-product', async function(req, res, next){
  const {
    name, 
    price, 
    title, 
    image, 
    brand,
    category,
    man_hinh,
    he_dieu_hanh,
    chip,
    pin,
    hang,
    camera_truoc,
    camera_sau,
    anh_chi_tiet_sp,
    ram,
    luu_tru,
    gia,
    mau_sac,
    ten_mau,
    anh_mau
  } = req.body;

  const chi_tiet_sp = {
    man_hinh,
    anh_chi_tiet_sp: Array.isArray(anh_chi_tiet_sp) ? anh_chi_tiet_sp : [anh_chi_tiet_sp],
    he_dieu_hanh,
    dung_luong_Gia: Array.isArray(ram) ? ram.map((_, i) => ({
      ram: ram[i],
      luu_tru: luu_tru[i],
      gia: gia[i]
    })) : [{
      ram,
      luu_tru,
      gia
    }],
    mau_sac: Array.isArray(mau_sac) ? mau_sac.map((_, i) => ({
      ma: mau_sac[i],
      ten: ten_mau[i],
      anh: anh_mau[i]
    })) : [{
      ma: mau_sac,
      ten: ten_mau,
      anh: anh_mau
    }],
    chip,
    pin,
    hang,
    camera: [{
      camera_truoc,
      camera_sau
    }]
  };

  const newItem = {
    name, 
    price, 
    title, 
    image, 
    brand,
    category,
    chi_tiet_sp
  };

  await modelProd.create(newItem);
  res.redirect("/");
});

// Xóa
router.get("/delete/:id", async function(req, res, next){
  const {id} = req.params;
  await modelProd.findByIdAndDelete(id);
  res.redirect("/");
});

module.exports = router;
