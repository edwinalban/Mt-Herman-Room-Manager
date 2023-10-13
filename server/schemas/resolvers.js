const { AuthenticationError } = require('apollo-server-express');
const { Room, Employee, Group, Schedule } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.employee) {
                const employee = await Employee.findOne({ _id: context.empoloyee._id })
                .populate('schedules')
                .populate(
                    {
                        path: 'schedules',
                        populate: 'room'
                    }
                );

                return employee
            }

            throw new AuthenticationError('You are not logged in');
        },
        Employees: async () => {
            const employees = await Employee.find()
                .populate('schedules')
                .populate(
                    {
                        path: 'schedules',
                        populate: 'room'
                    }
                );

            return employees;
        },
        Employee: async (parent, { _id }) => {
            return await Employee.findById(_id)
                .populate('schedules')
                .populate(
                    {
                        path: 'schedules',
                        populate: 'room'
                    }
                );
        },
        Rooms: async () => {
            const rooms = await Room.find()
                .populate('assignedTo');

            return rooms;
        },
        Room: async (parent, { _id }) => {
            return await Room.findById(_id)
                .populate(
                    [
                        'assignedTo',
                        'updatedBy',
                        'group'
                    ]
                );
        },
        Groups: async () => {
            const groups = await Group.find()
                .populate(
                    [
                        'currentRoom',
                        'previousRoom'
                    ]
                );

            return groups;
        },
        Group: async (parent, { _id }) => {
            return await Group.findById(_id)
                .populate(
                    [
                        'currentRoom',
                        'previousRoom'
                    ]
                );
        },
        Schedules: async (parent, { date }) => {
            return await Schedule.find({ date })
                .populate(
                    [
                        'room',
                        'group',
                        'assignedTo'
                    ]
                );
        },
        SchedulesByDateRange: async (parent, { startDate, endDate }) => {
            const schedules = await Schedule.find({
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            })
                .populate(
                    [
                        'room',
                        'group',
                        'assignedTo',
                        'date'
                    ]
                );

            return schedules;
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
        employeeUpdateRoom: async (parent, {
            _id,
            clean,
            notes,
            employeeId
        }) => {
            const room = await Room.findOneAndUpdate(
                { _id: _id },
                {
                    $set: {
                        clean: clean,
                        notes: notes,
                        lastUpdated: new Date(),
                        updatedBy: employeeId
                    },
                },
                { new: true }
            )
                .populate('updatedBy');

            return room;
        },
        adminUpdateRoom: async (parent, {
            _id,
            inspected,
            nextCleaningDate,
            notes,
            employeeId
        }) => {
            const room = await Room.findOneAndUpdate(
                { _id: _id },
                {
                    $set: {
                        inspected: inspected,
                        nextCleaningDate: nextCleaningDate,
                        notes: notes,
                        lastUpdated: new Date(),
                        employeeId: employeeId
                    }
                },
                { new: true }
            )
                .populate('updatedBy');

            return room;
        },
        assignRoom: async (parent, { _id, assignedTo }) => {
            try {
                const employee = await Employee.findById(assignedTo[0]._id);

                if (!employee) {
                    throw new Error('Employee not found');
                }

                const assignedEmployee = {
                    _id: assignedTo[0]._id,
                    username: employee.username,
                };

                const room = await Room.findByIdAndUpdate(
                    _id,
                    {
                        $push: {
                            assignedTo: assignedEmployee,
                        },
                    },
                    { new: true },
                )
                    .populate('assignedTo');

                if (!room) {
                    throw new Error('Room not found');
                }

                const schedule = new Schedule({
                    room: room._id,
                    assignedTo: assignedEmployee._id,
                    date: new Date(), // You can set the date to the current date or any other relevant date.
                });

                await schedule.save();

                await Employee.findByIdAndUpdate(
                    assignedTo[0]._id,
                    {
                        $addToSet: {
                            schedules: schedule._id,
                        },
                    }
                );

                return room;
            } catch (error) {
                console.error('Error assigning room:', error);
                throw error;
            }
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

            const room = await Room.findByIdAndUpdate(
                { _id: currentRoom },
                {
                    $push: {
                        group: group._id
                    }
                },
                { new: true }
            );

            const newGroup = await Group.findById(group._id)
                .populate(
                    [
                        'currentRoom',
                        'previousRoom'
                    ]
                );

            return newGroup;
        },
        updateGroup: async (parent, {
            _id,
            name,
            size,
            arriving,
            departing,
            midweek,
            weekend,
            currentRoom,
            previousRoom,
            amenities
        }) => {
            const group = await Group.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        name: name,
                        size: size,
                        arriving: arriving,
                        departing: departing,
                        midweek: midweek,
                        weekend: weekend,
                        currentRoom: currentRoom,
                        previousRoom: previousRoom,
                        amenities: amenities
                    }
                },
                { new: true }
            )
                .populate(
                    [
                        'currentRoom',
                        'previousRoom'
                    ]
                );

            return group
        },
        addSchedule: async (parent, {
            room,
            group,
            assignedTo,
            date
        }) => {
            const schedule = await Schedule.create(
                {
                    room,
                    group,
                    assignedTo,
                    date
                }
            );

            const newSchedule = await Schedule.findById(schedule._id)
                .populate(
                    [
                        'room',
                        'group',
                        'assignedTo'
                    ]
                );

            return newSchedule;
        }
    },
};

module.exports = resolvers;