import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css'],
})
export class DepartmentCreateComponent implements OnInit {
  submitted = false;
  departmentForm = this.fb.group({
    deptid: [''],
    dname: [''],
    mgrid: [''],
    location_id: [''],
  });
  mgrs: any;
  locs: any;
  constructor(public fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.readmgr();
    this.readlocations();
  }
  readmgr() {
    this.apiService.getEmployeesmgr().subscribe((data: any) => {
      this.mgrs = data;
      console.log(this.mgrs);
    });
  }
  readlocations() {
    this.apiService.getlocations().subscribe((data: any) => {
      this.locs = data;
      console.log(this.locs);
    });
  }
  onSubmit() {
    console.log(this.departmentForm.value);
    this.submitted = true;
    if (!this.departmentForm.valid) {
      return false;
    } else {
      return this.apiService
        .createdepartment(this.departmentForm.value)
        .subscribe({
          complete: () => {
            alert('department successfully created!');
            // this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
          },
          error: (e: any) => {
            console.log(e);
          },
        });
      return false;
    }
  }
}
