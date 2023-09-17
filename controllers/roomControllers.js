const { Room, Employee } = require('../models');

module.exports = {
    async getRooms(req, res) {
        try {
            const rooms = await Room.find();
            res.json(rooms);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async getOneRoom(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId })
                .select('-__V');

            if (!room) {
                return res.status(404)
                    .json({ message: "No room with that ID" });
            }

            res.json(room);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async updateRoom(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId })
                .select('-__V');

            if (!room) {
                return res.status(404)
                    .json({ message: "No room with that ID" });
            }

            room.set(req.body);
            room.save();
            res.json({ message: "Room status updated" });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async assignRoom(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId })
                .select('-__V');

            if (!room) {
                return res.status(404)
                    .json({ message: "No room with that ID" });
            }

            const employee = await Employee.findOne({ _id: req.params.employeeId });

            if (!employee) {
                return res.status(404)
                    .json({ message: "No employee with that ID" })
            }

            room.assignedTo.push(employee);
            room.save();
            employee.roomsAssigned.push(room);
            employee.save();
            res.json({ message: "Room assigned" });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async unassignRoom(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId });

            if (!room) {
                res.status(404)
                    .json({ message: "No room with that ID" });
            }

            const employee = await Employee.findOne({ _id: req.params.employeeId });

            if (!employee) {
                res.status(404)
                    .json({ message: "No employee with that ID" });
            }

            room.assignedTo.pull(employee);
            room.save();
            employee.roomsAssigned.pull(room);
            employee.save();
            res.json({ message: "Room unassigned" });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    }
};