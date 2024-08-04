const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartItems = new Schema({
    product : {type: Schema.Types.ObjectId, ref: 'Product', require: true},
    quantity: {type: Number, require: true, default: 1}
});

const cart = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'User', require: true},
    items: [cartItems]
});

module.exports = mongoose.model('Cart', cart)