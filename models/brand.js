// File models/Brand.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "null" },
  // Các trường khác nếu cần thiết
});

module.exports = mongoose.model('Brand', brandSchema);
