import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RepositoryService } from '../../shared/services/repository.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRepositoryService {

  private readonly url = environment.apiUrl + '/api/employees';

  constructor(private repository: RepositoryService) { }

  public getAll(): Observable<object> {
    return this.repository.getAll(this.url);
  }

  public getById(id: number, withDetails: boolean = false): Observable<object> {
    if (withDetails) {
      return this.repository.getByIdWithDetails(this.url, id);
    }
    return this.repository.getById(this.url, id);
  }

  public create(employee: Employee): Observable<object> {
    return this.repository.create(this.url, employee);
  }

  public update(id: number, employee: Employee): Observable<object> {
    return this.repository.update(this.url, id, employee);
  }

  public delete(id: number): Observable<object> {
    return this.repository.delete(this.url, id);
  }
}
