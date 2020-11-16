import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RepositoryService } from '../../shared/services/repository.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRepositoryService {

  private readonly url = environment.apiUrl + '/api/employees';

  constructor(private repository: RepositoryService) { }

  public getAll = () => {
    return this.repository.getAll(this.url);
  }

  public getById = (id: number) => {
    return this.repository.getById(this.url, id);
  }

  public create = (employee: Employee) => {
    return this.repository.create(this.url, employee);
  }

  public update = (id: number, employee: Employee) => {
    return this.repository.update(this.url, id, employee);
  }

  public delete = (id: number) => {
    return this.repository.delete(this.url, id);
  }
}
