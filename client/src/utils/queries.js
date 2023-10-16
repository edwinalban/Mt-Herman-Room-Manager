import { gql } from '@apollo/client';

export const ME = gql`
    query Me {
        me {
            username
            permissions
            schedules {
                date
                room {
                building
                floor
                roomNumber
                clean
                nextCleaningDate
                notes
                }
            }
        }
    }
`;

export const EMPLOYEES = gql`
    query Employees {
        employees {
            _id
            username
            schedules {
                date
                room {
                building
                floor
                roomNumber
                clean
                nextCleaningDate
                notes
                }
            }
        }
    }
`;

export const EMPLOYEE = gql`
    query Employee($id: ID!) {
        employee(_id: $id) {
            _id
            username
            schedules {
                date
                room {
                building
                floor
                roomNumber
                clean
                nextCleaningDate
                notes
                }
            }
        }
    }
`;

export const ROOMS = gql`
    query Rooms {
        rooms {
            _id
            building
            floor
            roomNumber
            assignedTo {
                _id
                username
            }
            clean
            inspected
            nextCleaningDate
            midweekFluff
            weekendFluff
            masterDeluxe
            ada
            group {
                _id
                name
                arriving
                departing
            }
            notes
            lastUpdated
            updatedBy {
                _id
                username
            }
        }
    }
`;

export const ROOM = gql`
    query Room($id: ID!) {
        room(_id: $id) {
            _id
            building
            floor
            roomNumber
            assignedTo {
                _id
                username
            }
            clean
            inspected
            nextCleaningDate
            midweekFluff
            weekendFluff
            masterDeluxe
            ada
            group {
                _id
                name
                arriving
                departing
            }
            notes
            lastUpdated
            updatedBy {
                _id
                username
            }
        }
    }
`;

export const GROUPS = gql`
    query Groups {
        groups {
            _id
            name
            size
            arriving
            departing
            midweek
            weekend
            currentRoom {
                _id
                building
                floor
                roomNumber
                notes
            }
            previousRoom {
                _id
                building
                floor
                roomNumber
                notes
            }
            amenities
        }
    }
`;

export const GROUP = gql`
query Group {
    group {
        _id
        name
        size
        arriving
        departing
        midweek
        weekend
        currentRoom {
            _id
            building
            floor
            roomNumber
            notes
        }
        previousRoom {
            _id
            building
            floor
            roomNumber
            notes
        }
        amenities
    }
}
`;

export const SCHEDULES = gql`
    query Schedules($date: String) {
        schedules(date: $date) {
            room {
                _id
                building
                floor
                roomNumber
                nextCleaningDate
                notes
            }
            group {
                _id
                name
            }
            assignedTo {
                _id
                username
            }
            date
        }
    }
`;

export const SCHEDULES_BY_DATE_RANGE = gql`
    query SchedulesByDateRange($startDate: String!, $endDate: String!) {
        schedulesByDateRange(startDate: $startDate, endDate: $endDate) {
            room {
                _id
                building
                floor
                roomNumber
                nextCleaningDate
                notes
            }
            group {
                _id
                name
            }
            assignedTo {
                _id
                username
            }
            date
        }
    }
`;