import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {AddEmployee} from '../add-employee/add-employee.component';
import {EmployeeService} from '../services/employee-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  id: string;
  constructor(public snackBar: MatSnackBar,private activatedRoute: ActivatedRoute , private employeeService: EmployeeService , private route: Router) {
   this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  skills: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formData = new FormGroup({
    name: new FormControl(null , [Validators.required]),
    email: new FormControl(null , [Validators.email, Validators.required]),
    isManager: new FormControl(null , [Validators.required]),
    designation: new FormControl(null , [Validators.required]),
    salary: new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
  });
  initalState: AddEmployee;
  isUserManager: boolean;
  ngOnInit(): void {
    this.isUserManager = JSON.parse(localStorage.getItem('Employee_Manager')).isManager;
    this.employeeService.getEmployeeById(this.id).subscribe((res) => {
      this.initalState = res.user;
      this.formData.setValue({
        name: this.initalState.name,
        email: this.initalState.email,
        isManager: this.initalState.isManager.toString(),
        designation: this.initalState.designation,
        salary: this.initalState.salary,
      });
      this.skills = this.initalState.skills;
    });
  }
  onSubmit(): void {
    let data: AddEmployee;
    if (this.formData.value.isManager === 'true') {
      data = {
        ...this.formData.value,
        isManager: true
      };
    }else {
      data = {
        ...this.formData.value,
        isManager: false
      };
    }
    data = {
      ...data,
      skills: this.skills
    };
    this.employeeService.updateEmployeeById(this.id, data).subscribe((res) => {

      if (this.isUserManager) {
        this.route.navigateByUrl('manager');
        this.openSnackBar('Manager Updated', 'close')
      }else {
        this.route.navigateByUrl('employee');
        this.openSnackBar('Employee Updated', 'close')
      }
    });
  }
openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 2000,
      });
   } 
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if (value.trim()) {
      this.skills.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }


}

export interface UpdateEmployee {
  name: string;
  email: string;
  isManager: boolean;
  salary: string;
  skills: string[];
  designation: string;
}
