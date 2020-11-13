import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {
  baseurl = environment.baseurl;
  constructor(private http: HttpClient) {}
  login(email: string , password: string): any {
    return this.http.post(this.baseurl + 'login' , {email, password});
  }
}
