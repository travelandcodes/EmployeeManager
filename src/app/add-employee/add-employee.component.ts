import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ManagerService} from '../services/manager-service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  formData = new FormGroup({
    name: new FormControl(null , [Validators.required]),
    email: new FormControl(null , [Validators.email, Validators.required]),
    password: new FormControl(this.password_generator(8), [Validators.required]),
    isManager: new FormControl(null , [Validators.required]),
    designation: new FormControl(null , [Validators.required]),
    salary: new FormControl(null , [Validators.required , Validators.pattern(/^\d+$/)]),
    DOJ: new FormControl(null , [Validators.required]),
  });
  skills: string[] = [];
  constructor(public snackBar:MatSnackBar,private managerService: ManagerService , private route: Router) {}
 password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
       let entity1 = Math.ceil(string.length * Math.random()*Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        let entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        let hold = string.charAt( entity1 );
        hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    return password.substr(0,len);
}
  ngOnInit(): void {
  }
  onSubmit(): void {
    let data: AddEmployee;
    if (this.formData.value.isManager === 'true') {
      data = {
        ...this.formData.value,
        isManager: true
      };
    }else {
      data = {
        ...this.formData.value,
        isManager: false
      };
    }
    data = {
      ...data,
      skills: this.skills
    };
    this.managerService.addUser(data).subscribe((res) => {
      this.route.navigateByUrl('manager');
      this.openSnackBar('Employee Added', 'close')
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
 } 
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
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

}
export interface AddEmployee {
  name: string;
  email: string;
  isManager: boolean;
  DOJ: Date;
  salary: string;
  skills: string[];
  designation: string;
  password: string;
}
