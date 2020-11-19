import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees: Employee[] = null;

  constructor(private repository: EmployeeRepositoryService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll = () => {
    try {
      this.repository.getAll()
        .subscribe(result => {
          this.employees = result as Employee[];
        }, error => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  public redirectToCreate = () => {
    this.router.navigate(['/employee/create']);
  }
}
