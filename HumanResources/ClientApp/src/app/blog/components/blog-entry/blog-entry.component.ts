import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BlogEntry } from '../../models/blog-entry.model';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { ModalService } from '../../../shared/services/modal.service';
import { BlogRepositoryService } from '../../services/blog-repository.service';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { BlogEntryEdit } from '../../models/blog-entry-edit.model';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.css']
})
export class BlogEntryComponent extends FormComponentBase implements OnInit {

  private contentOldValue: string;

  @Input()
  public blogEntry: BlogEntry;

  @Output()
  public reloadBlogEntries = new EventEmitter();

  public isEditMode: boolean = false;

  public get isModifiedVisible(): boolean {
    return this.blogEntry.creationDate !== this.blogEntry.modificationDate;
  }

  public get canBeModified(): boolean {
    return this.authorization.currentUser.id === this.blogEntry.author.id;
  }

  constructor(private authorization: AuthorizationService,
    private repository: BlogRepositoryService,
    protected modal: ModalService) {
      super(modal)
     }

  ngOnInit(): void {
  }

  private changeEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  public editBlogEntry(): void {
    this.contentOldValue = this.blogEntry.content;
    this.changeEditMode();
  }

  public acceptChanges(): void {
    const blogEntryEdit: BlogEntryEdit = {
      id: this.blogEntry.id,
      content: this.blogEntry.content
    };

    this.repository.updateBlogEntry(blogEntryEdit)
      .subscribe(result => {
        this.changeEditMode();
        this.reloadBlogEntries.emit();
      }, error => {
        this.handleError(error.message);
      });    
  }

  public cancelChanges(): void {
    this.blogEntry.content = this.contentOldValue;
    this.changeEditMode();
  }

}
