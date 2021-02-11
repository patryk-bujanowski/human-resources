import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user.model';
import { BlogEntry } from '../../models/blog-entry.model';

@Component({
  selector: 'app-blog-entry-list',
  templateUrl: './blog-entry-list.component.html',
  styleUrls: ['./blog-entry-list.component.css']
})
export class BlogEntryListComponent implements OnInit {

  public blogEntries: BlogEntry[] = [
    { id: '1', author: null, creationDate: Date.now.toString(), modificationDate: Date.now.toString(), body: 'Test nr 1' },
    { id: '2', author: null, creationDate: Date.now.toString(), modificationDate: Date.now.toString(), body: 'Test nr 2' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
