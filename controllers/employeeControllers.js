const { Employee } = require('../models');

module.exports = {
    async getEmployees(req, res) {
        try {
            const employees = await Employee.find();
            res.json(employees);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async getOneEmployee(req, res) {
        try {
            const employee = await Employee.findOne({ _id: req.params.employeeId })
                .select('-__V');

            if (!employee) {
                return res.status(404)
                    .json({ message: "No employee with that ID" });
            }

            res.json(employee);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    }
};