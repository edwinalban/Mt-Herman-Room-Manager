import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            roomsAssigned
        }
    }
`;

export const GET_EMPLOYEES = gql`
    {
        getEmployees {
            _id
            username
            roomsAssigned
        }
    }
`;

export const GET_EMPLOYEE = gql`
    {
        getOneEmployee {
            _id
            username
            roomsAssigned
        }
    }
`;

export const GET_ROOMS = gql`
    {
        getRooms {
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

export const GET_ONE_ROOM = gql`
    {
        getOneRoom {
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

export const GET_GROUPS = gql`
    {
        getGroups {
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

export const GET_ONE_GROUP = gql`
    {
        getOneGroup {
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

export const GET_SCHEDULE = gql`
    query getSchedule($date: String) {
        getSchedule(date: $date) {
            room
            group
            assignedTo
            date
        }
    }
`;