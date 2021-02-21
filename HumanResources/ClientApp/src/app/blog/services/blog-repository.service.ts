import { Injectable } from '@angular/core';
import { RepositoryService } from '../../shared/services/repository.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogEntryCreate } from '../models/blog-entry-create.model';
import { environment } from '../../../environments/environment';
import { BlogEntryEdit } from '../models/blog-entry-edit.model';

@Injectable({
  providedIn: 'root'
})
export class BlogRepositoryService extends RepositoryService {

  constructor(protected http: HttpClient) {
    super(http);
   }

  public getAllBlogEntries(): Observable<object> {
    return this.getAll(environment.apiUrl + '/api/blog/entry');
   }

  public createBlogEntry(blogEntry: BlogEntryCreate): Observable<object> {
    return this.create(environment.apiUrl + '/api/blog/entry', blogEntry);
   }

   public updateBlogEntry(blogEntry: BlogEntryEdit): Observable<object> {
     return this.update(environment.apiUrl + '/api/blog/entry', blogEntry.id, blogEntry);
   }
}
