const { Schema, model } = require('mongoose');
const formatDate = require('../utils/formatDate');
const groupSchema = require('./Group');

const ScheduleSchema = new Schema(
    {
        room: {
            type: Schema.Types.ObjectId,
            ref: 'room',
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: groupSchema,
        },
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: 'employee',
            }
        ],
        date: {
            type: Date,
            get: (date) => (formatDate(date)),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

const Schedule = model('schedule', ScheduleSchema);

module.exports = Schedule;