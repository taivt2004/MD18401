const mongoose = require('mongoose');
const connection = require('../db.js'); // Import connection

const cateSchema = new mongoose.Schema({
  name: { type: String, index: true, required: true },
  description: { type: String, default: "null" },
});

const Category = connection.model('Categories', cateSchema);
module.exports = Category;