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
        employees: async () => {
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
        employee: async (parent, { _id }) => {
            return await Employee.findById(_id)
                .populate('schedules')
                .populate(
                    {
                        path: 'schedules',
                        populate: 'room'
                    }
                );
        },
        employeeIdByUsername: async (parent, username) => {
            const employee = await Employee.findOne(username);
            console.log('Employee:', employee)
            return employee;
        },
        rooms: async () => {
            const rooms = await Room.find()
                .populate('assignedTo');

            return rooms;
        },
        roomsByBuilding: async (parent, { building }) => {
            const rooms = await Room.find({ building })
                .populate('assignedTo');

            return rooms;
        },
        room: async (parent, { _id }) => {
            return await Room.findById(_id)
                .populate(
                    [
                        'assignedTo',
                        'updatedBy',
                        'group'
                    ]
                );
        },
        groups: async () => {
            const groups = await Group.find()
                .populate(
                    [
                        'currentRoom',
                        'previousRoom'
                    ]
                );

            return groups;
        },
        group: async (parent, { _id }) => {
            return await Group.findById(_id)
                .populate(
                    [
                        'currentRoom',
                        'previousRoom'
                    ]
                );
        },
        schedules: async (parent, { date }) => {
            return await Schedule.find({ date })
                .populate(
                    [
                        'room',
                        'group',
                        'assignedTo'
                    ]
                );
        },
        schedulesByDateRange: async (parent, { startDate, endDate }) => {
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
        schedulesByRoomId: async (parent, { roomId }) => {
            const schedules = await Schedule.find({ room: roomId })
                .populate('assignedTo');
            return schedules;
        },
    },
    Mutation: {
        addEmployee: async (parent, { username, password }) => {
            const employee = await Employee.create({ username, password });
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
            return await Employee.findByIdAndDelete(_id) //need to add way to remove employee id from Schedule when deleted
        },
        login: async (parent, { username, password }) => {
            const employee = await Employee.findOne({ username });

            if (!employee) {
                throw new AuthenticationError('Incorrect credentials');
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
        assignEmployee: async (parent, { _id, employeeIds }) => {
            try {
                const schedule = await Schedule.findByIdAndUpdate(
                    _id,
                    {
                        $push: {
                            assignedTo: {
                                $each: employeeIds
                            }
                        }
                    },
                    { new: true }
                )
                    .populate(
                        [
                            'assignedTo',
                            'room'
                        ]
                    );

                await Employee.updateMany(
                    { _id: { $in: employeeIds } },
                    {
                        $push: {
                            schedules: _id
                        }
                    }
                );

                return schedule;
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