import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee = {
    name: 'Prateek Gango',
    designation: 'CEO of Xoriant',
    id: 1,
    salary: 6000000,
    doj: new Date(),
    skills: ['Node' , 'Angular', 'React']
  };
  constructor(public route: Router) { }

  ngOnInit(): void {
  }
  editEmployee(): void {
    this.route.navigateByUrl('update-employee/' + this.employee.id);
  }

}
