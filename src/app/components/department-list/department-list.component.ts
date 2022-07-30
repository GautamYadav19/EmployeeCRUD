import { Component, OnInit } from '@angular/core';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  department: any = [];
  constructor(private apiService: ApiService) {
    this.readdepartment();
  }
  ngOnInit(): void {}

  readdepartment() {
    this.apiService.getdepartments().subscribe((data: any) => {
      this.department = data;
      console.log(this.department);
    });
  }
  removeDeparment(departments: { deptid: any }, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deletedepartment(departments.deptid).subscribe((data) => {
        this.department.splice(index, 1);
      });
    }
  }
}
