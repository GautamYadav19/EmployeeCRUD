import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'],
})
export class DepartmentEditComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  mgrs: any;
  locs: any;
  // employeeData!: Employee[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.readlocations();
    this.readmgr();
    // this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getdepartment(id);
    this.editForm = this.fb.group({
      deptid: [''],
      dname: [''],
      mgrid: [''],
      location_id: [''],
    });
  }
  getdepartment(id: any) {
    this.apiService.getdepartment(id).subscribe((data) => {
      this.editForm.patchValue({
        deptid: data['deptid'],
        dname: data['dname'],
        mgrid: data['mgrid'],
        location_id: data['location_id'],
      });
    });
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
    this.submitted = true;

    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('deptid');
        this.apiService.updatedepartment(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/department-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
      return true;
    }
  }
}
