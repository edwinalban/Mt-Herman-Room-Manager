// imports Router
const router = require('express').Router();

// imports functions from groupControllers.js
const {
    assignGroup,
    unassignGroup,
    updateGroup,
} = require('../../controllers/groupControllers');

// imports functions from roomControllers.js
const {
    getRooms,
    getOneRoom,
    updateRoom,
    assignRoom,
    unassignRoom,
} = require('../../controllers/roomControllers');

// api/rooms
router.route('/')
    .get(getRooms); // gets all rooms

// api/rooms/:roomId
router.route('/:roomId')
    .get(getOneRoom) // gets one room by id
    .put(updateRoom); // udpates one room by id

// api/rooms/:roomId/assign/:employeeId
router.route('/:roomId/assign/:employeeId')
    .post(assignRoom) // assigns room to employee by room/employee id
    .delete(unassignRoom); // removes room assignment from employee by room/employee id

// api/rooms/:roomId/group
router.route('/:roomId/group')
    .post(assignGroup); // assigns group to room by room id

// api/rooms/:roomId/group/:groupId
router.route('/:roomId/group/:groupId')
    .put(updateGroup) // updates group by room id
    .delete (unassignGroup); // removes group from room by room/group id

// exports router
module.exports = router;