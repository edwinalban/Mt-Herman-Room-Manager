const mongoose = require('mongoose');
const { Room, Employee } = require('../models');
const {
    lakesideRoomSeeds,
    laurelRoomSeeds,
    gwinnRoomSeeds,
    employeeSeeds,
} = require('./index');

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
    await Room.insertMany(lakesideRoomSeeds);
    await Room.insertMany(laurelRoomSeeds);
    await Room.insertMany(gwinnRoomSeeds);
    await Employee.deleteMany({});
    await Employee.insertMany(employeeSeeds);
};

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
    .then(() => {
        console.log('MONGO CONNECTION CLOSED');
    });