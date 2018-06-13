import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  constructor(public employeeService: EmployeeService) { }

  employees: Employee[] = [];
  private employeeSub: Subscription;

  ngOnInit() {
    this.employeeService.getEmployee();
    this.employeeSub = this.employeeService.getEmployeeUpdateListener().subscribe(
      (employees: Employee[]) => {
      this.employees = employees;
    });
  }



  ngOnDestroy() {
    this.employeeSub.unsubscribe();
  }

}
