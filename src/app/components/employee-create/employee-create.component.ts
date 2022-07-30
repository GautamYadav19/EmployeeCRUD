import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  departments: any = [];
  jobs: any = [];
  mgrs: any = [];

  employeeForm = this.fb.group({
    ename: [''],
    jobid: [''],
    mgrid: [''],
    hiredate: [''],
    salary: [''],
    comission: [''],
    deptid: [''],
  });
  constructor(public fb: FormBuilder, private apiService: ApiService) {}
  readdepartment() {
    this.apiService.getdepartments().subscribe((data: any) => {
      this.departments = data;
      console.log(this.departments);
    });
  }
  readjobs() {
    this.apiService.getEmployeesjobs().subscribe((data: any) => {
      this.jobs = data;
      console.log(this.jobs);
    });
  }
  readmgr() {
    this.apiService.getEmployeesmgr().subscribe((data: any) => {
      this.mgrs = data;
      console.log(this.mgrs);
    });
  }

  ngOnInit(): void {
    this.readdepartment();
    this.readjobs();
    this.readmgr();
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          alert('Employee successfully created!');
          // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
      return false;
    }
  }
}
