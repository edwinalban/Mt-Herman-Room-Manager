const express = require('express');

const seedEmployees = [
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

module.exports = seedEmployees;