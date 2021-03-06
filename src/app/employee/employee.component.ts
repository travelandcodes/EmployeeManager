import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Router} from '@angular/router';
import {EmployeeService} from '../services/employee-service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  employeeId: string;
  constructor(public route: Router ,  private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('Employee_Manager'));
    this.employeeId = user._id;
    this.employeeService.getEmployeeById(this.employeeId).subscribe((res) => {
      this.employee = res.user;
    });
  }
  editEmployee(): void {
    this.route.navigateByUrl('update-employee/' + this.employee._id);
  }

}
