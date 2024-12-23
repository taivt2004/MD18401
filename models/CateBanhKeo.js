const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cateBanhKeoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "null" },
  // Các trường khác nếu cần thiết
});

module.exports = mongoose.model('CateBanhKeo', cateBanhKeoSchema);
