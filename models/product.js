const db = require('../db');
const { Schema } = require('mongoose');

// Giá theo dung lượng bộ nhớ
const storagePriceSchema = new Schema({
  ram: String,          // "8GB"
  storage: String,      // "256GB"
  price: Number,        // Giá cho phiên bản này
  cpu: String           // Nếu cần ghi thêm
}, { _id: false });

// Màu sắc sản phẩm
const colorSchema = new Schema({
  code: String,         // "#000000"
  name: String,         // "Đen"
  image: String         // Ảnh minh họa màu
}, { _id: false });

// Camera chi tiết
const cameraSchema = new Schema({
  rear: {
    resolution: String,     // "200MP + 8MP + 2MP"
    video: [String],        // ["4K@30fps", "1080p@60fps"]
    features: [String]      // ["HDR", "OIS", "Panorama", "Night Mode", ...]
  },
  front: {
    resolution: String,     // "16MP"
    video: [String],        // ["1080p@30fps", "1080p@60fps"]
    features: [String]      // ["AI Beauty", "HDR", "Portrait"]
  }
}, { _id: false });

// Màn hình
const screenSchema = new Schema({
  size: String,             // "6.67 inches"
  resolution: String,       // "2400x1080 pixels"
  technology: String,       // "AMOLED"
  refreshRate: String,      // "120Hz"
  brightness: String,       // "1200 nits"
  protection: String        // "Corning Gorilla Glass 5"
}, { _id: false });

// Hiệu năng
const performanceSchema = new Schema({
  chip: String,             // "Snapdragon 7s Gen 2"
  gpu: String,              // "Adreno 710"
  ram: String,              // "8GB"
  rom: String               // "256GB"
}, { _id: false });

// Pin & sạc
const batterySchema = new Schema({
  capacity: String,         // "5100 mAh"
  charging: String,         // "67W fast charging"
  type: String              // "Li-Po"
}, { _id: false });

// Kết nối
const connectivitySchema = new Schema({
  nfc: { type: Boolean, default: false },
  sim: String,              // "Dual nano-SIM hoặc 1 nano-SIM + 1 eSIM"
  infrared: { type: Boolean, default: false },
  headphoneJack: { type: Boolean, default: false },
  network: String,          // "5G"
  wifi: String,             // "Wi-Fi 6"
  bluetooth: String,        // "Bluetooth 5.3"
  gps: [String]             // ["GPS", "GLONASS", "BEIDOU"]
}, { _id: false });

// Thiết kế
const designSchema = new Schema({
  dimensions: String,       // "161.2 x 74.2 x 8.1 mm"
  weight: String,           // "187g"
  material: String,         // "Kính + khung nhôm"
  waterproof: String        // "IP68"
}, { _id: false });

//tiện ích khác 
const featuresSchema = new Schema({
  waterResistant: String,      // "IP54"
  displayTech: [String],       // ["Dolby Vision", "Chặn tin nhắn", "Chặn cuộc gọi", ...]
  extraFeatures: [String],     // ["Ghi âm mặc định", "Ghi âm cuộc gọi", "Cảm biến hồng ngoại"]
  audioTech: [String],         // ["Loa âm thanh nổi", "Âm thanh Dolby Atmos", "Âm thanh Hi-Res Audio"]
  fingerprint: String,         // "Cảm biến vân tay trong màn hình"
  sensors: [String],           // ["Gia tốc", "Tiệm cận", "Ánh sáng", "La bàn", "Áp kế", "Trọng lực"]
  special: [String],           // ["Hỗ trợ 5G", "Bảo mật vân tay", "Nhận diện khuôn mặt", "Kháng nước, kháng bụi"]
  wifi: String,                // "Wi-Fi 802.11 a/b/g/n/ac Dual-band (2.4 GHz/5 GHz)"
  bluetooth: String            // "v5.2"
}, { _id: false });



// Schema chính chi tiết sản phẩm
const detailSchema = new Schema({
  screen: screenSchema,
  operating_system: String,     // "Android 14"
  storage_price: [storagePriceSchema],
  colors: [colorSchema],
  performance: performanceSchema,
  battery: batterySchema,
  connectivity: connectivitySchema,
  design: designSchema,
  camera: cameraSchema,
  features: featuresSchema,
  warranty: String,             // "12 tháng"
  brand_name: String,
  detail_images: [String]
}, { _id: false });

// Schema sản phẩm
const productSchema = new Schema({
  name: { type: String, required: true },   // "Xiaomi Redmi Note 13 Pro 5G"
  title: String,                            // mô tả ngắn
  price: { type: Number, required: true },
  image: String,
  details: detailSchema,
  variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' }
});

const Product = db.model('Product', productSchema);
module.exports = Product;
