const db = require('../db');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, sparse: true },
    address: { type: String },
    avatar: { type: String },
    fullName: { type: String },
}, { timestamps: true });

const User = db.model('Users', UserSchema);
module.exports = User;
