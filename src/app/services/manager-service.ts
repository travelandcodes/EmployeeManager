import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Employee} from '../app.module';
import {AddEmployee} from '../add-employee/add-employee.component';

@Injectable()
export class ManagerService {
  baseurl = environment.baseurl;
  constructor(private http: HttpClient) {}
  getAllEmployees(): any {
    return this.http.get(this.baseurl + 'findMany');
  }
  addUser(data: AddEmployee): any {
    return this.http.post(this.baseurl + 'add-user' , data);
  }
}

