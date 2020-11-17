import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  showLoginError = false;
  loginForm = new FormGroup({
    email: new FormControl(null , [Validators.email , Validators.required]),
    password: new FormControl(null , [Validators.minLength(4) , Validators.required])
  });
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((val) => {
      this.showSpinner = false;
      localStorage.setItem('Employee_Manager', JSON.stringify(val.user));
      if (val.user.isManager === true) {
        this.router.navigateByUrl('/manager');
      }else {
        this.router.navigateByUrl('/employee');
      }
    } , (error) => {
      this.showLoginError = true;
      this.showSpinner = false;
    });
  }
}
