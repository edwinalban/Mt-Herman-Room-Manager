const router = require('express').Router();
const employeeRoutes = require('./employeeRoutes');
const roomRoutes = require('./roomRoutes');

router.use('/employees', employeeRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;