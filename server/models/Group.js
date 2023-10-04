const { Schema } = require('mongoose');
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
        building: {
            type: String,
            required: true,
        },
        floor: {
            type: String,
            required: true,
        },
        roomNumber: {
            type: String,
            required: true,
        },
        ada: {
            type: Boolean,
            required: true,
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

module.exports = groupSchema;