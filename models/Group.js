const { Schema } = require('mongoose');

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
        },
        departing: {
            type: Date,
            required: true,
        },
        midweek: {
            type: Boolean,
            default: false,
        },
        weekend: {
            type: Boolean,
            default: true,
        },
    },
);

module.exports = groupSchema;