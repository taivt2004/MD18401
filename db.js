// db.js
const mongoose = require('mongoose');

const connection = mongoose.createConnection(
    'mongodb+srv://vtt2004abc:H4wiRWIlgldAD76P@taivt.mtwazra.mongodb.net/db_phonestore2025'
);

connection.on('connected', () => {
    console.log('Connected to MongoDB 2025');
});

module.exports = connection;
