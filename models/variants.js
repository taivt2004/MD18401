const db = require('../db');
const { Schema } = require('mongoose');

const variantSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },

    sku: { type: String, unique: true },
    network: String,
    ram: String,
    storage: String,
    color: {
        code: String,
        name: String,
        image: String
    },

    price: Number,
    images: [String],
    stock: Number,
    extraSpecs: {
        cpu: String,
        gpu: String
    }
});

const Variant = db.model('Variant', variantSchema);
module.exports = Variant;
