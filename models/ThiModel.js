const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giaoThongSchema = new Schema({
    licenseplate: { type: String, required: true },
    information: { type: String, required: true },
    status: { type: Number, default: 0 } 
});

module.exports = mongoose.model('GiaoThong', giaoThongSchema);
