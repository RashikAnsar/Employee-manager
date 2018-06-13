const express = require('express');
const EmployeeController= require('./controllers/employee');

const router = express.Router();

router.post("/employees", EmployeeController.createEmployee);

router.get("/employees", EmployeeController.getEmployee);

module.exports = router;
