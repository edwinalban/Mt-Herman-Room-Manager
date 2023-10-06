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
        Schedule: async (parent, { date }) => {
            return await Schedule.findOne(date)
                .populate(['room', 'group', 'assignedTo'])
        },
    },
    Mutation: {
        addEmployee: async (parent, { username, password, permissions }) => {
            const employee = await Employee.create({ username, password, permissions });
            const token = signToken(employee);

            return { token, employee };
        },
        updateEmployee: async (parent, { _id, username, password, permissions }) => {
            const employee = await Employee.findOneAndUpdate(
                { _id: _id},
                { $set: {
                    username: username,
                    password: password,
                    permissions: permissions,
                }},
                {new: true}
                );
            
            return employee;
        },
        login: async (parent, { username, password }) => {
            const employee = await Employee.findOne({ username });

            if (!employee) {
                throw new AuthenticationError('Incorrect username');
            }

            const correctPW = await employee.validatePassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(employee);

            return { token, employee };
        },
    }
};

module.exports = resolvers;