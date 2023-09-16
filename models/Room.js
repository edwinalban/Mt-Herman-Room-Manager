const { Schema, model } = require('mongoose');

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
            }
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
        }
    },
);

const Room = model('room', RoomSchema);

module.exports = Room;