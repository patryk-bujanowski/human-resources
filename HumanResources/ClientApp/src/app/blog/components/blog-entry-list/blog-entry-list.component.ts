import { Component, OnInit, Input } from '@angular/core';
import { BlogEntry } from '../../models/blog-entry.model';
import { BlogRepositoryService } from '../../services/blog-repository.service';

@Component({
  selector: 'app-blog-entry-list',
  templateUrl: './blog-entry-list.component.html',
  styleUrls: ['./blog-entry-list.component.scss']
})
export class BlogEntryListComponent implements OnInit {

  @Input()
  public blogEntryList: BlogEntry[];

  constructor(private repository: BlogRepositoryService) { }

  ngOnInit(): void {
    this.getAllBlogEntries();
  }

  public getAllBlogEntries(): void {
    this.repository.getAllBlogEntries()
      .subscribe(result => {
        this.blogEntryList = result as BlogEntry[]
      });
  }

}
