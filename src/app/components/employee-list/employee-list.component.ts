import { Component, OnInit } from '@angular/core';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  Employee: any = [];
  mgrname: any = [];
  constructor(private apiService: ApiService) {
    this.readEmployee();
  }
  ngOnInit(): void {
    this.readmgrname();
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe((data: any) => {
      this.Employee = data;
      console.log(this.Employee);
    });
  }
  removeEmployee(employee: { empid: any }, index: any) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee.empid).subscribe((data) => {
        this.Employee.splice(index, 1);
      });
    }
  }
  readmgrname() {
    this.apiService.getEmployeesmgrname().subscribe((data: any) => {
      this.mgrname = data;
      console.log(this.mgrname);
    });
  }
  // getindex(employee: { empid: any }, index: any) {
  //   if (window.confirm('Are you sure?')) {
  //     this.apiService.getEmployeeid(employee.empid).subscribe((data) => {
  //       this.Employee.indexOf(index);
  //     });
  //   }
  //   console.log(this.Employee.indexOf('index'));
  // }
}
