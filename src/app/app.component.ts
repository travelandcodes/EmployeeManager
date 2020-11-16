import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
  title = 'EmployeeManager';
  showLogout: boolean;
  constructor(private router: Router) {
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
  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
