import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UpdateEmployee} from '../employee-update/employee-update.component';
import {hasI18nAttrs} from '@angular/compiler/src/render3/view/i18n/util';

@Injectable()
export class EmployeeService {
  baseurl = environment.baseurl;
  constructor(private http: HttpClient) {}
  getEmployeeById(id: string): any {
    return this.http.get(this.baseurl + 'user/' + id);
  }
  updateEmployeeById(id: string , data: UpdateEmployee): any {
    return this.http.post(this.baseurl + 'update-user/' + id , {user: data});
  }
}
