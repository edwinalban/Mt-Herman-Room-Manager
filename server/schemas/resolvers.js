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
        getEmployees: async () => {
            const employees = await Employee.find();

            return employees;
        }
    }
}

module.exports = resolvers;