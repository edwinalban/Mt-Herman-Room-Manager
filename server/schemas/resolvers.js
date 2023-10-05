const { AuthenticationError } = require('apollo-server-express');
const { Room, Employee, Group, Schedule } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.employee) {
                const employee = await Employee.findOne({ _id: context.empoloyee._id })
                    .populate('roomsAssigned');

                return employee
            }

            throw new AuthenticationError('You are not logged in');
        },
        Employees: async () => {
            const employees = await Employee.find();

            return employees;
        },
        Employee: async (parent, { _id }) => {
            return await Employee.findById(_id)
                .populate('roomsAssigned');
        },
        Rooms: async () => {
            const rooms = await Room.find();

            return rooms;
        },
        Room: async (parent, { _id }) => {
            return await Room.findById(_id)
                .populate('assignedTo')
                .populate('updatedBy')
                .populate('group');
        },
        Groups: async () => {
            const groups = await Group.find();

            return groups;
        },
        Group: async (parent, { _id }) => {
            return await Group.findById(_id);
        },
        Schedule: async(parent, { date }) => {
            return await Schedule.findOne(date)
                .populate('room')
                .populate('group')
                .populate('assignedTo')
        },
    },
};

module.exports = resolvers;