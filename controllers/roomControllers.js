const { Room } = require('../models');

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

    async updateRoomStatus(req, res) {
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
    }
}