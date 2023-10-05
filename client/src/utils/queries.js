import { gql } from '@apollo/client';

export const ME = gql`
    {
        me {
            _id
            username
            roomsAssigned
        }
    }
`;

export const EMPLOYEES = gql`
    {
        Employees {
            _id
            username
            roomsAssigned
        }
    }
`;

export const EMPLOYEE = gql`
    {
        Employee {
            _id
            username
            roomsAssigned
        }
    }
`;

export const ROOMS = gql`
    {
        Rooms {
            _id
            building
            floor
            roomNumber
            assignedTo { _id }
            dirty
            clean
            inspected
            nextCleaningDate
            midweekFluff
            weekendFluff
            notes
            masterDeluxe
            lastUpdated { _id }
            updatedBy
            ada
            group { _id }
        }
    }
`;

export const ROOM = gql`
    {
        Room {
            _id
            building
            floor
            roomNumber
            assignedTo { _id }
            dirty
            clean
            inspected
            nextCleaningDate
            midweekFluff
            weekendFluff
            notes
            masterDeluxe
            lastUpdated { _id }
            updatedBy
            ada
            group { _id }
        }
    }
`;

export const GROUPS = gql`
    {
        Groups {
            name
            size
            arriving
            departing
            midweek
            weekend
            assignedRoom { _id }
            amenities
        }
    }
`;

export const GROUP = gql`
    {
        Group {
            name
            size
            arriving
            departing
            midweek
            weekend
            assignedRoom { _id }
            amenities
        }
    }
`;

export const SCHEDULE = gql`
    query Schedule($date: String) {
        Schedule(date: $date) {
            room
            group
            assignedTo
            date
        }
    }
`;