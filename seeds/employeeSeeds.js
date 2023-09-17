const express = require('express');

const employeeSeeds = [
    {
        username: "edwin",
        password: "password",
        permissions: "admin",
        roomsAssigned: [],
    },
    {
        username: "scott",
        password: "password1",
        permissions: "assistant",
        roomsAssigned: [],
    },
    {
        username: "tim",
        password: "password2",
        permissions: "employee",
        roomsAssigned: [],
    },
]

module.exports = employeeSeeds;