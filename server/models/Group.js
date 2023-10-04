const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trimmed: true,
        },
        size: {
            type: Number,
            required: true,
        },
        arriving: {
            type: Date,
            required: true,
            get: (date) => formatDate(date),
        },
        departing: {
            type: Date,
            required: true,
            get: (date) => formatDate(date),
        },
        midweek: {
            type: Boolean,
            default: false,
        },
        weekend: {
            type: Boolean,
            default: true,
        },
        assignedRoom: {
            type: Schema.Types.ObjectId,
            ref: 'room'
        },
        amenities: {
            type: String,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

const Group = model('group', groupSchema)

module.exports = Group;