import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public users: Observable<User[]>;

  constructor(private search: SearchService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = null;
    this.getUsers();
  }

  public getUsers(): void {
    const query = atob(this.activatedRoute.snapshot.params.query);
    this.search.getUsers(query)
      .subscribe(result => {
        this.users = of(result);
      });
  }

}
