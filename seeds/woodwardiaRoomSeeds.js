const express = require('express');

const woodwardiaRoomSeeds = [
    {
        building: "Woodwardia",
        floor: 1,
        roomNumber: 1,
        assignedTo: [],
        status: "Clean",
        amenities: "C, R, M",
        masterDeluxe: false,
        ada: false,
    },
    {
        building: "Woodwardia",
        floor: 1,
        roomNumber: 2,
        assignedTo: [],
        status: "Clean",
        amenities: "C, R, M",
        masterDeluxe: false,
        ada: false,
    },
];

module.exports = woodwardiaRoomSeeds;