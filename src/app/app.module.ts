import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { DepartmentCreateComponent } from './components/department-create/department-create.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth/auth.module';
import { AuthGuardService } from './service/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    DepartmentCreateComponent,
    DepartmentListComponent,
    DepartmentEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
  ],
  providers: [DatePipe, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
