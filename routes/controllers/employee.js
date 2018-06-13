const Employee = require('../../models/Employee');

exports.createEmployee = (req, res, next) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city
  });
  employee.save().then(createdEmployee => {
    res.status(201).json({
      message: "Employee added successfully",
      employeeId: createdEmployee._id
    });
  });
};


exports.getEmployee = (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: "Employees fetched successfully!",
      employees: documents
    });
  });
};
