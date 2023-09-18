const express = require('express');
const { Room, groupSchema } = require('../models');

module.exports = {
    async assignGroup(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId });

            if (!room) {
                return res.status(404)
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

    async updateGroup(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId });

            if (!room) {
                return res.status(404)
                    .json({ message: 'No room with that ID' });
            }
            
            room.group[0].set(req.body)
            room.save();
            res.json({ message: 'Group updated' });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async unassignGroup(req, res) {
        try {
            const room = await Room.findOne({ _id: req.params.roomId });

            if (!room) {
                return res.status(404)
                    .json({ message: 'No room with that ID' });
            }

            const group = req.params.groupId;

            room.group.pull({ _id: group });
            room.save();
            res.json({ message: 'Group removed from room' });
        } catch (e) {
            res.status(500)
                .json(e);
        }
    }

};

