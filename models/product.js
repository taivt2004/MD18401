const screenSchema = new mongoose.Schema({
  size: String,
  resolution: String,
  technology: String,
  refreshRate: String,
  brightness: String,
  protection: String
}, { _id: false });

const batterySchema = new mongoose.Schema({
  capacity: String,
  charging: String,
  type: String
}, { _id: false });

const cameraSchema = new mongoose.Schema({
  resolution: String,
  video: [String],
  features: [String]
}, { _id: false });

const detailsSchema = new mongoose.Schema({
  screen: screenSchema,
  operating_system: String,
  storage_price: [{
    ram: String,
    storage: String,
    price: Number,
    cpu: String
  }],
  colors: [{
    code: String,
    name: String,
    image: String
  }],
  performance: {
    chip: String,
    gpu: String,
    ram: String,
    rom: String
  },
  battery: batterySchema,
  connectivity: {
    nfc: Boolean,
    sim: String,
    infrared: Boolean,
    headphoneJack: Boolean,
    network: String,
    wifi: String,
    bluetooth: String,
    gps: [String]
  },
  design: {
    dimensions: String,
    weight: String,
    material: String,
    waterproof: String
  },
  camera: {
    rear: cameraSchema,
    front: cameraSchema
  },
  features: {
    waterResistant: String,
    displayTech: [String],
    extraFeatures: [String],
    audioTech: [String],
    fingerprint: String,
    sensors: [String],
    special: [String],
    wifi: String,
    bluetooth: String
  },
  warranty: String,
  brand_name: String,
  detail_images: [String]
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  image: String,
  details: detailsSchema,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" }
});

module.exports = mongoose.model("Product2025", productSchema);
