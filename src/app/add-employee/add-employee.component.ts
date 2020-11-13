import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  formData = new FormGroup({
    name: new FormControl(null , [Validators.required]),
    designation: new FormControl(null , [Validators.required]),
    salary: new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
    doj: new FormControl(null , [Validators.required]),
    skills: new FormControl(null , [Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.formData.value);
  }

}
