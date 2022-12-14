import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCreateComponent } from './components/department-create/department-create.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-employee' },
  {
    path: 'create-employee',
    component: EmployeeCreateComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'department-create', component: DepartmentCreateComponent },
  { path: 'department-list', component: DepartmentListComponent },
  { path: 'department-edit/:id', component: DepartmentEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
