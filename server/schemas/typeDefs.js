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
        permissions: String!
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
        room: Room
        group: Group
        assignedTo: [Employee]
        date: String
    }

    type Auth {
        token: ID!
        employee: Employee
    }

    type Query {
        me: Employee
        Employees: [Employee]
        Employee(_id: ID!): Employee
        Rooms: [Room]
        Room(_id: ID!): Room
        Groups: [Group]
        Group(_id: ID!): Group
        Schedules(date: String): [Schedule]
        SchedulesByDateRange(startDate: String!, endDate: String!): [Schedule] 
    }

    input AssignedToInput {
        _id: ID
        username: String
    }

    type Mutation {
        addEmployee(
            username: String!
            password: String!
            permissions: String!
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
        ): Room
        adminUpdateRoom(
            _id: ID
            inspected: Boolean
            nextCleaningDate: String
            notes: String
        ): Room
        assignRoom(
            _id: ID
            assignedTo: [AssignedToInput]
        ): Room
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
            previousRoom: ID
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