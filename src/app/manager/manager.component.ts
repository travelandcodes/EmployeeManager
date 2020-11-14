import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Options} from 'ng5-slider';
import {FormControl} from '@angular/forms';
import {ManagerService} from '../services/manager-service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  autoComplete = new FormControl();
  autoCompleteArray: Employee[] = [];
  employeesList: Employee[] = [];
  constructor(private managerService: ManagerService) { }

  minValue = 400000;
  maxValue = 1000000;
  options: Options = {
    floor: 0,
    ceil: 5000000,
    step: 10000
  };
  filter(): void {
    console.log(this.minValue , this.maxValue);
  }

  ngOnInit(): void {
    this.autoComplete.valueChanges.subscribe((value) => {
      this.autoCompleteArray = this._filter(value);
    });
    this.managerService.getAllEmployees().subscribe((res) => {
      this.employeesList = res.users;
    });
  }
  viewButtonClicked(id: number): void {
    console.log('view' + id);
  }
  editButtonClicked(id: number): void {
    console.log('edit' + id);
  }
  deleteButtonClicked(id: number): void {
    console.log('delete' + id);
  }
  private _filter(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.employeesList.filter(employee => employee.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
