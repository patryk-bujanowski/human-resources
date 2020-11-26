import { Injectable } from '@angular/core';
import { AuthorizeService } from 'src/app/api-authorization/authorize.service';
import { Employee } from '../models/employee.model';
import { EmployeeRepositoryService } from './employee-repository.service';
import { IUser } from '../../api-authorization/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {

  public profile: Employee;
  public userId: string;

  constructor(private repository: EmployeeRepositoryService, private authorize: AuthorizeService) { }

  public loadProfile(): void {
    this.authorize.getUser()
      .subscribe(result => {
        this.userId = result.sub;
      });

    this.repository.getByUserId(this.userId)
      .subscribe(result => {
        this.profile = result as Employee;
      });
  }

  public unloadProfile(): void {
    this.profile = null;
    this.userId = null;
  }
}
