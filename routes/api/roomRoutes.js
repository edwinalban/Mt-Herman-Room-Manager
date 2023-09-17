const router = require('express').Router();

const {
    getRooms,
    getOneRoom,
    updateRoom,
    assignRoom,
    unassignRoom,
} = require('../../controllers/roomControllers');

router.route('/')
    .get(getRooms);

router.route('/:roomId')
    .get(getOneRoom)
    .put(updateRoom);

router.route('/:roomId/:employeeId')
    .put(assignRoom)
    .delete(unassignRoom);

module.exports = router;