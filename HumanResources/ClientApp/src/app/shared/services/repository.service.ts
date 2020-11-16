import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public getAll = (url: string) => {
    return this.http.get(url, this.getHttpOptions());
  }

  public getById = (url: string, id: any) => {
    return this.http.get(`${url}/${id}`, this.getHttpOptions());
  }

  public create = (url: string, body: any) => {
    return this.http.post(url, body, this.getHttpOptions());
  }

  public update = (url: string, id: any, body: any) => {
    return this.http.put(`${url}/${id}`, body, this.getHttpOptions());
  }

  public delete = (url: string, id: any) => {
    return this.http.delete(`${url}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
