import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchTerm: string = '';
  sortField: string = 'employee_name';
  sortDirection: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data.data;
    });
  }

  onSort(direction: string) {
    this.sortDirection = direction;
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }
}