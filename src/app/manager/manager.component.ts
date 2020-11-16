import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Options} from 'ng5-slider';
import {FormControl} from '@angular/forms';
import {ManagerService} from '../services/manager-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  autoComplete = new FormControl();
  employeesList: Employee[] = [];
  constructor(private managerService: ManagerService , private router: Router) { }

  minValue = 0;
  maxValue = 500000;
  options: Options = {
    floor: 0,
    ceil: 500000,
    step: 50000
  };
  keyword = '';
  filter(): void {
    this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword).subscribe((res) => {
      this.employeesList = res.users;
    });
  }

  ngOnInit(): void {
    this.autoComplete.valueChanges.subscribe((value) => {
      this.keyword = value;
      this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword).subscribe((res) => {
        this.employeesList = res.users;
      });
    });
    this.managerService.getAllEmployees().subscribe((res) => {
      this.employeesList = res.users;
    });
  }
  viewButtonClicked(id: string): void {
    console.log('view' + id);
    this.router.navigateByUrl('employee/' + id );
  }
  editButtonClicked(id: string): void {
    console.log('edit' + id);
    this.router.navigateByUrl('update-employee/' + id);
  }
  deleteButtonClicked(id: string): void {
    console.log('delete' + id);
    this.managerService.deleteEmployee(id).subscribe(() => {
      console.log('User Deleted');
      this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword).subscribe((res) => {
        this.employeesList = res.users;
      });
    });
  }

}
