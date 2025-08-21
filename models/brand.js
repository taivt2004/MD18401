const mongoose = require('mongoose');
const connection = require('../db.js'); // Import connection

const brandSchema = new mongoose.Schema({
  name: { type: String, index: true, required: true },
  description: { type: String, default: "null" },
});

const Brand = connection.model('Brand', brandSchema); // Sử dụng connection từ db.js

module.exports = Brand;