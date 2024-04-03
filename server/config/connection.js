const mongoose = require('mongoose');

let connectionString;

if (process.env.NODE_ENV === 'production') {

    connectionString = process.env.MONGODB_URI;
} else {

    connectionString = 'mongodb://127.0.0.1:27017/roomManagerDB';
}

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;