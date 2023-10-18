const express = require('express');

const oakRoomSeeds = [
    {
        building: "Oak",
        floor: 1,
        roomNumber: 1,
        assignedTo: [],
        status: "Clean",
        amenities: "C, R, M",
        masterDeluxe: false,
        ada: false,
    },
    {
        building: "Oak",
        floor: 1,
        roomNumber: 2,
        assignedTo: [],
        status: "Clean",
        amenities: "C, R, M",
        masterDeluxe: false,
        ada: false,
    }
];

module.exports = oakRoomSeeds;