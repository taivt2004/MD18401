const mongoose = require('mongoose');

const connection = mongoose.createConnection(
    'mongodb+srv://vtt2004abc:H4wiRWIlgldAD76P@taivt.mtwazra.mongodb.net/db_phonestore2025',
    {
        serverSelectionTimeoutMS: 30000, // Tăng timeout lên 30 giây
        heartbeatFrequencyMS: 10000, // Kiểm tra kết nối thường xuyên
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false // Tắt buffering để tránh timeout
    }
);

connection.on('connected', () => console.log('Connected to MongoDB 2025'));
connection.on('error', (err) => console.error('MongoDB connection error:', err));
connection.on('disconnected', () => console.log('MongoDB disconnected. Attempting to reconnect...'));
connection.on('reconnected', () => console.log('MongoDB reconnected'));

module.exports = connection;