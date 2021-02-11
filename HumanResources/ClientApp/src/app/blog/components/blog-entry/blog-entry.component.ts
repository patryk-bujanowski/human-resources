import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent implements OnInit {

  @Input()
  public author: string;

  @Input()
  public body: string;

  @Input()
  public modificationDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
