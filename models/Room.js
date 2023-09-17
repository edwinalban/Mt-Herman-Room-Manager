const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');
const groupSchema = require('./Group');

const RoomSchema = new Schema(
    {
        building: {
            type: String,
            required: true,
        },
        floor: {
            type: Number,
            required: true,
        },
        roomNumber: {
            type: Number,
            required: true,
        },
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: "employee",
            },
        ],
        status: {
            type: String,
            required: true,
        },
        midweekFluff: {
            type: Boolean,
            default: false,
        },
        weekendFluff: {
            type: Boolean,
            default: false,
        },
        amenities: {
            type: String,
        },
        notes: {
            type: String,
        },
        masterDeluxe: {
            type: Boolean,
            required: true,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
            get: (date) => (formatDate(date)),
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "employee",
        },
        ada: {
            type: Boolean,
            required: true,
        },
        group: [groupSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

const Room = model('room', RoomSchema);

module.exports = Room;