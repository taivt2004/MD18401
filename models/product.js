const db = require("../db");
const { Schema } = require("mongoose");

const storagePriceSchema = new Schema({
  ram: String,
  storage: String,
  price: Number
}, { _id: false });

const colorSchema = new Schema({
  code: String,
  name: String,
  image: String
}, { _id: false });

const cameraSchema = new Schema({
  front: String,
  rear: String
}, { _id: false });

const detailSchema = new Schema({
  screen: String,
  detail_images: [String],
  operating_system: String,
  storage_price: [storagePriceSchema],
  colors: [colorSchema],
  chip: String,
  battery: String,
  brand_name: String,
  camera: cameraSchema
}, { _id: false });

const productSchema = new Schema({
  name: { type: String, required: true },
  title: String,
  price: { type: Number, required: true },
  image: String,
  details: detailSchema,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" }
});

// ⚡ KHÁC BIỆT: tạo model từ connection mới, tránh cache cũ
const Product2025 = db.model("Product2025", productSchema, "products");

module.exports = Product2025;
