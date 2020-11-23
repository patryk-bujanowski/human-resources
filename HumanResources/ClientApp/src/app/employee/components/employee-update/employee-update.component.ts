import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { Employee } from '../../models/employee.model';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent extends FormComponentBase implements OnInit {

  public employee: Employee;
  public employeeForm: FormGroup;

  constructor(private repository: EmployeeRepositoryService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute) {
      super();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });

    this.getEmployeeById(this.activatedRoute.snapshot.params.id);
  }

  private getEmployeeById(id: number): void {
    this.repository.getById(id)
      .subscribe(result => {
        this.employee = result as Employee;
        this.employeeForm.patchValue(this.employee);
      }, error => {
        console.error(error);
      });
  }

  public updateEmployee(employeeFormValue: any): void {
    this.employee.id = employeeFormValue.id;
    this.employee.firstName = employeeFormValue.firstName;
    this.employee.lastName = employeeFormValue.lastName;

    this.repository.update(this.employee.id, this.employee)
      .subscribe(() => {
        this.redirectToList();
      }, error => {
        console.error(error);
      });
  }

  public redirectToList(): void {
    this.router.navigate(['/employee/list']);
  }

  public redirectBack(): void {
    this.location.back();
  }

}
