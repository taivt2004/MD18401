const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String },
    email: { type: String, required: true },
    address: { type: String },
    avatar: {type: String},
    phone: { type: String, unique: true },  // Thay đổi thành String vì số điện thoại có thể có dấu +
    ho_ten: {type: String}
});

module.exports = mongoose.model('User', UserSchema);
