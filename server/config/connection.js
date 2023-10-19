const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://edwinalban:0GfVT9WGKwVtnAzn@cluster0.938sxem.mongodb.net/roomManagerDB?retryWrites=true&w=majority');

module.exports = mongoose.connection;