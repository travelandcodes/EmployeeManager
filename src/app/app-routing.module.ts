import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EmployeeComponent} from './employee/employee.component';
import {ManagerComponent} from './manager/manager.component';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';

const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'employee' , component: EmployeeComponent},
  {path: 'manager' , component: ManagerComponent},
  {path: 'update-employee/:id' , component: EmployeeUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
