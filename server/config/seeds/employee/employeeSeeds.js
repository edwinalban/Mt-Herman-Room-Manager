const express = require('express');

const employeeSeeds = [
    {
        username: "barnabus",
        password: "password",
        permissions: "admin",
        roomsAssigned: [],
    },
    {
        username: "jamantha",
        password: "password1",
        permissions: "assistant",
        roomsAssigned: [],
    },
    {
        username: "carol",
        password: "password2",
        permissions: "employee",
        roomsAssigned: [],
    },
]

module.exports = employeeSeeds;