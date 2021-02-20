import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../user/models/user.model';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  @Input()
  public author: User;

  @Input()
  public content: string;

  @Input()
  public modificationDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
