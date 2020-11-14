import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';
import {Options} from 'ng5-slider';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  autoComplete = new FormControl();
  autoCompleteArray: Employee[] = [];
  employeesList: Employee[] = [
    {
      name: 'Prateek Gango',
      designation: 'CEO of Xoriant',
      id: 1,
      salary: 6000000,
      doj: new Date(),
      skills: ['Node' , 'Angular', 'React']
    },
    {
      name: 'baba ramdev',
      designation: 'CEO of Patanjali',
      id: 2,
      salary: 6000000,
      doj: new Date(),
      skills: ['Node' , 'Angular', 'React']
    },
    {
      name: 'Mark Zukerberg',
      designation: 'CEO of Facebook',
      id: 3,
      salary: 6000000,
      doj: new Date(),
      skills: ['Node' , 'Angular', 'React']
    }
  ];
  constructor() { }

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
