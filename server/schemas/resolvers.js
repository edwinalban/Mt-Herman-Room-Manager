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
        updateEmployeePermissions: async (parent, { _id, permissions }) => {
            const employee = await Employee.findOneAndUpdate(
                { _id: _id },
                {
                    $set: {
                        permissions: permissions,
                    }
                },
                { new: true }
            );

            return employee;
        },
        deleteEmployee: async (parent, { _id }) => {
            return await Employee.findByIdAndDelete(_id) //need to add way to remove employee id from Room/Schedule when deleted
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
        updateRoom: async (parent, {
            _id,
            assignedTo,
            clean,
            inspected,
            nextCleaningDate,
            midweekFluff,
            weekendFluff,
            notes,
            lastUpdated,
            updatedBy,
            group
        }) => {
            const room = await Room.findOneAndUpdate(
                { _id: _id },
                {
                    $set: {
                        assignedTo: assignedTo,
                        clean: clean,
                        inspected: inspected,
                        nextCleaningDate: nextCleaningDate,
                        midweekFluff: midweekFluff,
                        weekendFluff: weekendFluff,
                        notes: notes,
                        lastUpdated: lastUpdated,
                        updatedBy: updatedBy,
                        group: group
                    }
                },
                { new: true }
            );

            return room;
        },
        addGroup: async (parent, {
            name,
            size,
            arriving,
            departing,
            midweek,
            weekend,
            currentRoom,
            amenities
        }) => {
            const group = await Group.create(
                {
                    name,
                    size,
                    arriving,
                    departing,
                    midweek,
                    weekend,
                    currentRoom,
                    amenities
                }
            );

            return group;
        },
    },
};

module.exports = resolvers;