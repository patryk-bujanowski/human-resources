import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public getAll(url: string): Observable<object> {
    return this.http.get(url, this.getHttpOptions());
  }

  public getById(url: string, id: any): Observable<object> {
    return this.http.get(`${url}/${id}`, this.getHttpOptions());
  }

  public getByIdWithDetails(url: string, id: any): Observable<object> {
    return this.http.get(`${url}/${id}?withDetails=true`, this.getHttpOptions());
  }

  public create(url: string, body: any): Observable<object> {
    return this.http.post(url, body, this.getHttpOptions());
  }

  public update(url: string, id: any, body: any): Observable<object> {
    return this.http.put(`${url}/${id}`, body, this.getHttpOptions());
  }

  public delete(url: string, id: any): Observable<object> {
    return this.http.delete(`${url}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
