import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Router} from '@angular/router';
import {EmployeeService} from '../services/employee-service';
import { ManagerService } from '../services/manager-service';
import { Options } from 'ng5-slider';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee;
  autoComplete = new FormControl();
  employeesList: Employee[] = [];
  user:Employee;
  employeeId: string;
  minValue = 0;
  maxValue = 500000;
  options: Options = {
    floor: 0,
    ceil: 500000,
    step: 50000
  };
  keyword = '';
  filter(): void {
    this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword).subscribe((res) => {
      this.employeesList = res.users;
    });
  }
  constructor(public route: Router ,  private employeeService: EmployeeService, private managerService:ManagerService) { }

  ngOnInit(): void {
    this.autoComplete.valueChanges.subscribe((value) => {
      this.keyword = value;
      this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword).subscribe((res) => {
        this.employeesList = res.users;
      });
      
    });
    this.managerService.getAllEmployees().subscribe((res) => {
      this.employeesList = res.users;
    });
     this.user = JSON.parse(localStorage.getItem('Employee_Manager'));
    this.employeeId = this.user._id;
    this.employeeService.getEmployeeById(this.employeeId).subscribe((res) => {
      this.employee = res.user;
    });
    this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword).subscribe((res) => {
      this.employeesList = res.users;
      console.log(this.employeesList);
    });
  }
  viewButtonClicked(id: string): void {
    console.log('view' + id);
    this.route.navigateByUrl('employee/' + id );
  }
  editEmployee(): void {
    this.route.navigateByUrl('update-employee/' + this.employee._id);
  }

}
