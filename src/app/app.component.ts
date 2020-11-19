import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { Employee } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
  title = 'EmployeeManager';
  showLogout: boolean;
  user:Employee;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('Employee_Manager'));
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.url = route.urlAfterRedirects;
        if (this.url === '/login') {
          this.showLogout = false;
        }else {
          this.showLogout = true;
        }
      }
    });
  }
  viewUser():void
  {
   
    window.location.assign(`http://localhost:4200/employee/${this.user._id}`);
  }
  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
