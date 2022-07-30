import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  // getEmployee(id: string | null) {
  //   throw new Error('Method not implemented.');
  // }
  baseUri: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Create - employee
  createEmployee(data: any): Observable<any> {
    let url = `${this.baseUri}/employeeinsert`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Create - department
  createdepartment(data: any): Observable<any> {
    let url = `${this.baseUri}/departmentinsert`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}/employee`);
  }
  // Get all department
  getdepartments() {
    return this.http.get(`${this.baseUri}/department`);
  }
  //get all jobs
  getEmployeesjobs() {
    return this.http.get(`${this.baseUri}/employeejobs`);
  }
  // get all mgr
  getEmployeesmgr() {
    return this.http.get(`${this.baseUri}/employeemgr`);
  }
  // get all mgr
  getEmployeesmgrname() {
    return this.http.get(`${this.baseUri}/employeemgrname`);
  }
  // get all locations
  getlocations() {
    return this.http.get(`${this.baseUri}/locations`);
  }
  // Delete employee
  deleteEmployee(id: any): Observable<any> {
    let url = `${this.baseUri}/employeedelete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete employee
  deletedepartment(id: any): Observable<any> {
    let url = `${this.baseUri}/departmentdelete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get by id
  getEmployee(id: any): Observable<any> {
    let url = `${this.baseUri}/employee/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res[0] || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Get by id department
  getdepartment(id: any): Observable<any> {
    let url = `${this.baseUri}/department/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res[0] || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update employee
  updateEmployee(empid: any, data: any): Observable<any> {
    let url = `${this.baseUri}/employeeupdate`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Update department
  updatedepartment(deptid: any, data: any): Observable<any> {
    let url = `${this.baseUri}/departmentupdate`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
