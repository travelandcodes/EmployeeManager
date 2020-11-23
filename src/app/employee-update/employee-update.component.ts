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
    password:new FormControl(this.password_generator(8),[Validators.required]),
    isManager: new FormControl(null , [Validators.required]),
    designation: new FormControl(null , [Validators.required]),
    salary: new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
  });
  initalState: AddEmployee;
  isUserManager: boolean;
  ngOnInit(): void {
   
    this.employeeService.getEmployeeById(this.id).subscribe((res) => {
      this.initalState = res.user;
      this.isUserManager = res.user.isManager;
      this.formData.setValue({
        name: this.initalState.name,
        email: this.initalState.email,
        password:null,
        isManager: this.initalState.isManager.toString(),
        designation: this.initalState.designation,
        salary: this.initalState.salary,
      });
      this.skills = this.initalState.skills;
    });
  }
  password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
       let entity1 = Math.ceil(string.length * Math.random()*Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        let entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        let hold = string.charAt( entity1 );
        hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    return password.substr(0,len);
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

      if (JSON.parse(localStorage.getItem('Employee_Manager')).isManager) {

        this.route.navigateByUrl('manager');
        if(this.isUserManager)
        {
          this.openSnackBar('Manager Updated', 'close')
        }
        else
        {
          this.openSnackBar('Employee Updated', 'close')
        }
       
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
