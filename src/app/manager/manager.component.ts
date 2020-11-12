import { Component, OnInit } from '@angular/core';
import {Employee} from '../app.module';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  emplyeesList: Employee[] = [
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

  ngOnInit(): void {}
  viewButtonClicked(id: number): void {
    console.log('view' + id);
  }
  editButtonClicked(id: number): void {
    console.log('edit' + id);
  }
  deleteButtonClicked(id: number): void {
    console.log('delete' + id);
  }

}
