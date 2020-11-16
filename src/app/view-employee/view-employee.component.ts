import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../services/employee-service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: Employee;
  id: string;
  constructor(public route: Router, private activeRoute: ActivatedRoute , private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(this.id).subscribe((res) => {
      console.log(res);
      this.employee = res.user;
    });
  }
  editEmployee(): void {
    this.route.navigateByUrl('update-employee/' + this.employee._id);
  }
}
