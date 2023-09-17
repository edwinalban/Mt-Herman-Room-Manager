const router = require('express').Router();

const {
    getRooms,
    getOneRoom,
    updateRoomStatus,
} = require('../../controllers/roomControllers');

router.route('/')
    .get(getRooms);

router.route('/:roomId')
    .get(getOneRoom)
    .put(updateRoomStatus);

module.exports = router;