import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../shared/authorization/authorization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormComponentBase } from '../shared/components/form-component-base';
import { Router } from '@angular/router';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent extends FormComponentBase implements OnInit {

  public searchForm: FormGroup;

  public get isAuthenticated(): Observable<boolean> {
    return of(this.authorization.isLoggedIn);
  }

  constructor(private authorization: AuthorizationService,
    private router: Router,
    protected modal: ModalService) {
    super(modal);
   }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', [Validators.required])
    });
  }

  public search(searchFormValue: any): void {
    const query = searchFormValue.query;
    this.router.navigate([`/search/results/${btoa(query)}`]);
  }

}
