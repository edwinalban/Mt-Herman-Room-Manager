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
    },

    async createEmployee(req, res) {
        try {
            const employee = await Employee.create(req.body);
            res.json(employee);
        } catch (e) {
            res.status(500)
                .json(e);
        }
    },

    async updateEmployee(req, res) {
        try {
            const employee = await Employee.findOne({ _id: req.params.employeeId })
                .select('-__V');

            if (!employee) {
                return res.status(404)
                    .json({ message: "No employee with that ID" });
            }

            employee.set(req.body);
            employee.save();
            res.json({ message: "Employee data updated" });
        } catch (e) {
            res.status(500)
                .json(e)
        }
    },

    async deleteEmployee(req, res) {
        try {
            const employee = await Employee.findOneAndDelete({ _id: req.params.employeeId });

            if (!employee) {
                res.status(404)
                    .json({ message: "No employee with that ID" });
            }
        } catch (e) {
            res.status(500)
                .json(e);
        }

        res.json({message: "Employee deleted"})
    },
};