const express = require('express');
const { Room, groupSchema } = require('../models');

module.exports = {
    async assignGroup(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId });

            if (!room) {
                res.status(404)
                    .json({ message: 'No room with that ID' });
            }

            room.group.addToSet(req.body);
            room.save();
            res.json({ message: 'Group assigned to room' });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async unassignGroup(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId });
            console.log(room);

            if (!room) {
                res.status(404)
                    .json({ message: 'No room with that ID' });
            }

            const group = req.params.groupId;
            console.log(group);

            room.group.pull({ _id: group });
            room.save();
            res.json({ message: 'Group removed from room' });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    }

};

