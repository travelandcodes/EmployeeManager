import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EmployeeComponent} from './employee/employee.component';
import {ManagerComponent} from './manager/manager.component';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {ManagerGuard} from './guards/ManagerGuard';
import {EmployeeGuard} from './guards/EmployeeGuard';
import {UpdateEmployeeGuard} from './guards/UpdateEmployeeGuard';
import {ViewEmployeeComponent} from './view-employee/view-employee.component';

const routes: Routes = [
  {path: '' , pathMatch: 'full' , redirectTo: '/login'},
  {path: 'login' , component: LoginComponent},
  {path: 'employee' , component: EmployeeComponent , canActivate: [EmployeeGuard]},
  {path: 'employee/:id' , component: ViewEmployeeComponent , canActivate: [ManagerGuard]},
  {path: 'manager' , component: ManagerComponent , canActivate: [ManagerGuard]},
  {path: 'manager/add-employee' , component: AddEmployeeComponent , canActivate: [ManagerGuard]},
  {path: 'update-employee/:id' , component: EmployeeUpdateComponent , canActivate: [UpdateEmployeeGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
