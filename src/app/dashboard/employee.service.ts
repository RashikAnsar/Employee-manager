import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

const BACKEND_URL = '/api/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];
  private employeeUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient) { }

  createEmployee(name: string, email: string, phone: number, city: string) {
    const employee: Employee = {id: null, name: name, email: email, phone: phone, city: city };
    this.http
      .post<{ message: string, employeeId: string }>( BACKEND_URL + 'employees', employee)
      .subscribe(responseData => {
        const id = responseData.employeeId;
        employee.id = id;
        this.employees.push(employee);
        this.employeeUpdated.next([...this.employees]);
      });
  }

  getEmployee() {
    this.http
      .get<{ message: string; employees: any }>(BACKEND_URL + 'employees')
      .pipe(map((employeeData) => {
        return employeeData.employees.map(emp => {
          return {
            name: emp.name,
            email: emp.email,
            phone: emp.phone,
            city: emp.city,
            id: emp._id
          };
        });
      }))
      .subscribe(transformedEmps => {
        this.employees = transformedEmps;
        this.employeeUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }
}
