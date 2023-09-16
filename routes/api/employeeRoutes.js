const router = require('express').Router();

const {
    getEmployees,
    getOneEmployee,
    updateEmployee,
    createEmployee,
    deleteEmployee
} = require('../../controllers/employeeControllers');

router.route('/')
    .get(getEmployees)
    .post(createEmployee);

router.route('/:employeeId')
    .get(getOneEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;