const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Room {
        _id: ID
        building: String!
        floor: Int!
        roomNumber: String!
        assignedTo: [Employee]
        dirty: Boolean
        clean: Boolean
        inspected: Boolean
        nextCleaningDate: String
        midweekFluff: Boolean
        weekendFluff: Boolean
        notes: String
        masterDeluxe: Boolean!
        lastUpdated: String
        updatedBy: Employee
        ada: Boolean!
        group: [Group]
    }

    type Employee {
        _id: ID
        username: String!
        password: String!
        permissions: String!
        roomsAssigned: [Room]
    }

    type Group {
        _id: ID
        name: String!
        size: Int!
        arriving: String
        departing: String
        midweek: Boolean
        weekend: Boolean
        assignedRoom: Room
        amenities: String
    }

    type Schedule {
        room: [Room]
        group: [Group]
        assignedTo: [Employee]
        date: String
    }

    type Auth {
        token: ID!
        employee: Employee
    }

    type Query {
        me: Employee
        getEmployees: [Employee]
        getOneEmployee: Employee
        getRooms: [Room]
        getOneRoom: Room
        getGroups: [Group]
        getOneGroup: Group
        getSchedule(date: String): Schedule
    }
`