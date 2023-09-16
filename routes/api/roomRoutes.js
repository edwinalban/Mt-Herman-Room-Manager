const router = require('express').Router();

const {
    getRooms,
    getOneRoom,
} = require('../../controllers/roomControllers');

router.route('/')
    .get(getRooms);

router.route('/:roomId')
    .get(getOneRoom);

module.exports = router;