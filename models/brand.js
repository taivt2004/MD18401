const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String,index: true, required: true },
  description: { type: String, default: "null" },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
