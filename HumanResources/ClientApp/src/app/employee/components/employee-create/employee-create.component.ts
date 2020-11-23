import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { EmployeeCreate } from '../../models/employee-create.model';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent extends FormComponentBase implements OnInit {

  public userId: string;

  public employeeForm: FormGroup;
  public detailsForm: FormGroup;

  constructor(private repository: EmployeeRepositoryService,
    private router: Router,
    private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.detailsForm = new FormGroup({
      birthdate: new FormControl(''),
      streetAddress: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl('')
    });

    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      details: this.detailsForm
    });
  }

  public createEmployee(employeeFormValue: any): void {
    const employee: EmployeeCreate = {
      id: null,
      firstName: employeeFormValue.firstName,
      lastName: employeeFormValue.lastName,
      sex: employeeFormValue.sex,
      userId: this.userId,
      position: null,
      details: employeeFormValue.details
    };

    this.repository.create(employee)
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
