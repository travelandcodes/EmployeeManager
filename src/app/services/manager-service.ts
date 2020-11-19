import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Employee} from '../app.module';
import {AddEmployee} from '../add-employee/add-employee.component';
import {query} from '@angular/animations';

@Injectable()
export class ManagerService {
  baseurl = environment.baseurl;
  constructor(private http: HttpClient) {}
  getAllEmployees(): any {
    return this.http.post(this.baseurl + 'findMany',{});
  }
  addUser(data: AddEmployee): any {
    return this.http.post(this.baseurl + 'add-user' , data);
  }
  deleteEmployee(id: string): any {
    return this.http.post(this.baseurl + 'delete-user' , {userId: id});
  }
  getFilteredEmployees(min: number , max: number , keyWord: string): any {
    return this.http.post(this.baseurl + 'findMany' ,
       { minSalary: min.toString(),maxSalary: max.toString(),keyword: keyWord
                      });
  }
}

