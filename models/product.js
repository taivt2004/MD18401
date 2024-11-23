// File models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  chi_tiet_sp: {
    man_hinh: { type: String },
    anh_chi_tiet_sp: [{ type: String }],
    he_dieu_hanh: { type: String },
    dung_luong_Gia: [{
      ram: { type: String },
      luu_tru: { type: String },
      gia: { type: Number }
    }],
    mau_sac: [{
      ma: { type: String },
      ten: { type: String },
      anh: {type: String}
    }],
    chip: { type: String },
    pin: { type: String },
    hang: { type: String },
    camera: [{ 
      camera_truoc: { type: String },
      camera_sau: { type: String }
    }],
  },
  category: { type: Schema.Types.ObjectId, ref: 'Category' }, 
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' }, 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

  