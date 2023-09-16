const router = require('express').Router();

const {
    getEmployees,
    getOneEmployee
} = require('../../controllers/employeeControllers');

router.route('/')
    .get(getEmployees);

router.route('/:employeeId')
    .get(getOneEmployee);

module.exports = router;