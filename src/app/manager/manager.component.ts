import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Options} from 'ng5-slider';
import {FormControl} from '@angular/forms';
import {ManagerService} from '../services/manager-service';
import {Router} from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  autoComplete = new FormControl();
  employeesList: Employee[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  autoComplete2=new FormControl();
  user:Employee;
  minValue = 0;
  skills:string[]=[];
  designation:string;
  
  maxValue = 500000;
  options: Options = {
    floor: 0,
    ceil: 500000,
    step: 50000
  };
  keyword = '';
  constructor(private managerService: ManagerService , private router: Router) { }

  
  filter(): void {
    this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword,this.designation,this.skills).subscribe((res) => {
      this.employeesList = res.users;
    });
  }

  ngOnInit(): void {
    this.autoComplete.valueChanges.subscribe((value) => {
      this.keyword = value;
      this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword,this.designation,this.skills).subscribe((res) => {
        this.employeesList = res.users;
      });
    });
    this.autoComplete2.valueChanges.subscribe(value=>{
      this.designation=value;
      
    })
    this.managerService.getAllEmployees().subscribe((res) => {
      this.employeesList = res.users;
      console.log(res);
    });
    this.user = JSON.parse(localStorage.getItem('Employee_Manager'));
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
      this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword,this.designation,this.skills).subscribe((res) => {
        this.employeesList = res.users;
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
   console.log(value);
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

  applyFilter():void
  {
    this.managerService.getFilteredEmployees(this.minValue , this.maxValue , this.keyword,this.designation,this.skills).subscribe((res) => {
      this.employeesList = res.users;
    });
  }
}
