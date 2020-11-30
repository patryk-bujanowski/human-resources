import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user/models/user.model';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public getUsers(query: string): Observable<User[]> {
    const url = environment.apiUrl + `/api/search?query=${query}`;
    return this.http.get<User[]>(url);
  }
}
