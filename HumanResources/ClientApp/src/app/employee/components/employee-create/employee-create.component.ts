import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { Employee } from '../../models/employee.model';
import { EmployeeRepositoryService } from '../../services/employee-repository.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent extends FormComponentBase implements OnInit {

  public employeeForm: FormGroup;

  constructor(private repository: EmployeeRepositoryService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });
  }

  public createEmployee = (employeeFormValue) => {
    const employee: Employee = {
      id: 0,
      firstName: employeeFormValue.firstName,
      lastName: employeeFormValue.lastName
    };

    this.repository.create(employee)
      .subscribe(() => {
        this.redirectToList();
      }, error => {
        console.error(error);
      });
  }

  public redirectToList = () => {
    this.router.navigate(['/employee/list']);
  }

}
