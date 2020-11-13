import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formData = new FormGroup({
    name: new FormControl(null , [Validators.required]),
    designation: new FormControl(null , [Validators.required]),
    salary: new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
    doj: new FormControl(null , [Validators.required]),
  });
  skills: string[] = ['Angular' , 'Node'];
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const data = {
      ...this.formData.value,
      skills: this.skills
    }
    console.log(data);
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
