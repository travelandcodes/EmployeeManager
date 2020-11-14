import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ManagerService} from '../services/manager-service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formData = new FormGroup({
    name: new FormControl(null , [Validators.required]),
    email: new FormControl(null , [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    isManager: new FormControl(null , [Validators.required]),
    designation: new FormControl(null , [Validators.required]),
    salary: new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
    DOJ: new FormControl(null , [Validators.required]),
  });
  skills: string[] = ['Angular' , 'Node'];
  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
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
    this.managerService.addUser(data).subscribe((res) => {
      console.log(res);
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
export interface AddEmployee {
  name: string;
  email: string;
  isManager: boolean;
  DOJ: Date;
  salary: string;
  skills: string[];
  designation: string;
  password: string;
}
