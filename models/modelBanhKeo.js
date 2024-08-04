const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho Product
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CateBanhKeo' 
  }
});

// Tạo model Product
const Product = mongoose.model('ProductBanhKeo', productSchema);

module.exports = Product;
