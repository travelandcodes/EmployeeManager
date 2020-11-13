import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EmployeeComponent} from './employee/employee.component';
import {ManagerComponent} from './manager/manager.component';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';

const routes: Routes = [
  {path: '' , pathMatch: 'full' , redirectTo: '/login'},
  {path: 'login' , component: LoginComponent},
  {path: 'employee' , component: EmployeeComponent},
  {path: 'manager' , component: ManagerComponent},
  {path: 'manager/add-employee' , component: AddEmployeeComponent},
  {path: 'update-employee/:id' , component: EmployeeUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
