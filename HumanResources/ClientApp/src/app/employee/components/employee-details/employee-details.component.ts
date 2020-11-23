import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizeService, IUser } from '../../../../api-authorization/authorize.service';
import { Employee } from '../../models/employee.model';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public employee: Employee;

  public user: IUser;

  constructor(private repository: EmployeeRepositoryService,
    private location: Location,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeById(this.activatedRoute.snapshot.params.id);
  }

  public getEmployeeById(id: number): void {
    this.repository.getById(id, true)
      .subscribe(result => {
        this.employee = result as Employee;
      }, error => {
        console.error(error);
      });
  }

  public redirectBack(): void {
    this.location.back();
  }

}
