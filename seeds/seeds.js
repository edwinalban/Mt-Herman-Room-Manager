const mongoose = require('mongoose');
const Room = require('../models/Room');
const seedRooms = require('./roomSeeds');
const seedEmployees = require('./employeeSeeds');
const Employee = require('../models/Employee');

mongoose
    .connect('mongodb://localhost:27017/roomManagerDB', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MONGO CONNECTION OPEN');
    })
    .catch((err) => {
        console.log(err)
    });

const seedDB = async () => {
    await Room.deleteMany({});
    await Room.insertMany(seedRooms);
    await Employee.deleteMany({});
    await Employee.insertMany(seedEmployees);
};

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
    .then(() => {
        console.log('MONGO CONNECTION CLOSED');
    });