import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const phone = form.value.phone;
    const city = form.value.city;

    this.employeeService.createEmployee(name, email, phone, city);
    form.resetForm();
  }

}
