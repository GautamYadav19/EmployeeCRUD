import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  // employeeData!: Employee[];

  constructor(
    public datepipe: DatePipe,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    // this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      empid: [id],
      ename: [''],
      jobid: [''],
      mgrid: [''],
      hiredate: [''],
      salary: [''],
      comission: [''],
      deptid: [''],
    });
  }
  getEmployee(id: any) {
    this.apiService.getEmployee(id).subscribe((data) => {
      this.editForm.patchValue({
        ename: data['ename'],
        jobid: data['jobid'],
        mgrid: data['mgrid'],
        hiredate: this.datepipe.transform(data['hiredate'], 'yyyy-MM-dd'),
        salary: data['salary'],
        comission: data['comission'],
        deptid: data['deptid'],
      });
    });
  }
  // updateEmployee() {
  //   this.editForm = this.fb.group({
  //     ename: [''],
  //     jobid: [''],
  //     mgrid: [''],
  //     hiredate: [''],
  //     salary: [''],
  //     comission: [''],
  //     deptid: [''],
  //   });
  // }
  onSubmit() {
    this.submitted = true;

    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('empid');
        this.apiService.updateEmployee(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/employee-list');
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
