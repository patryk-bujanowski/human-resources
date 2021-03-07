import { Component, OnInit } from '@angular/core';
import { BlogEntry } from '../../../blog/models/blog-entry.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public blogEntries: BlogEntry[];

  constructor() { }

  ngOnInit(): void {
  }

}
