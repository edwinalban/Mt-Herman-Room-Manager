const express = require('express');

const mapleRoomSeeds = [
    {
        building: "Maple",
        floor: 1,
        roomNumber: 1,
        assignedTo: [],
        status: "Clean",
        amenities: "C, R, M",
        masterDeluxe: false,
        ada: false,
    },
    {
        building: "Maple",
        floor: 1,
        roomNumber: 2,
        assignedTo: [],
        status: "Clean",
        amenities: "C, R, M",
        masterDeluxe: false,
        ada: false,
    },
];

module.exports = mapleRoomSeeds;