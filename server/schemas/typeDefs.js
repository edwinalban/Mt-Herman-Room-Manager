const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Room {
        _id: ID
        building: String!
        floor: Int!
        roomNumber: String!
        assignedTo: [Employee]
        clean: Boolean
        inspected: Boolean
        nextCleaningDate: String
        midweekFluff: Boolean
        weekendFluff: Boolean
        notes: String
        masterDeluxe: Boolean
        lastUpdated: String
        updatedBy: Employee
        ada: Boolean
        group: [Group]
    }

    type Employee {
        _id: ID
        username: String!
        password: String!
        permissions: String
        schedules: [Schedule]
    }

    type Group {
        _id: ID
        name: String!
        size: Int!
        arriving: String
        departing: String
        midweek: Boolean
        weekend: Boolean
        currentRoom: Room
        previousRoom: [Room]
        amenities: String
    }

    type Schedule {
        _id: ID
        room: Room
        group: Group
        assignedTo: [Employee]
        date: String
    }

    type Auth {
        token: ID
        employee: Employee
    }

    type Query {
        me: Employee
        employees: [Employee]
        employee(_id: ID!): Employee
        employeeIdByUsername(username: String!): Employee
        rooms: [Room]
        roomsByBuilding(building: String!): [Room]
        room(_id: ID!): Room
        groups: [Group]
        group(_id: ID!): Group
        schedules(date: String): [Schedule]
        schedulesByDateRange(startDate: String!, endDate: String!): [Schedule]
        schedulesByRoomId(roomId: ID!): [Schedule]
    }

    input AssignedToInput {
        _id: ID
        username: String
    }

    type Mutation {
        addEmployee(
            username: String!
            password: String!
        ): Auth
        updateEmployeePermissions(
            _id: ID
            permissions: String
        ): Employee
        deleteEmployee(_id: ID!): Employee
        login(username: String!, password: String!): Auth
        employeeUpdateRoom(
            _id: ID
            clean: Boolean
            notes: String
            employeeId: ID
        ): Room
        adminUpdateRoom(
            _id: ID
            inspected: Boolean
            nextCleaningDate: String
            notes: String
            employeeId: ID
        ): Room
        assignEmployee(
            _id: ID
            employeeIds: [ID]
        ): Schedule
        addGroup(
            name: String!
            size: Int
            arriving: String
            departing: String
            midweek: Boolean
            weekend: Boolean
            currentRoom: ID!
            amenities: String
        ): Group
        updateGroup(
            _id: ID
            name: String!
            size: Int
            arriving: String
            departing: String
            midweek: Boolean
            weekend: Boolean
            currentRoom: ID!
            previousRoom: [ID]
            amenities: String
        ): Group
        addSchedule(
            room: ID
            group: ID
            assignedTo: [AssignedToInput]
            date: String
        ): Schedule
    }
`
module.exports = typeDefs;