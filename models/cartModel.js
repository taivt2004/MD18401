const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Liên kết Product
            quantity: { type: Number, required: true, default: 1 }, // Số lượng sản phẩm
            price: { type: Number, required: true } // Giá tại thời điểm thêm vào giỏ
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);
