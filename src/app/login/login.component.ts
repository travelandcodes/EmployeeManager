import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null , [Validators.email , Validators.required]),
    password: new FormControl(null , [Validators.minLength(6) , Validators.required])
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
