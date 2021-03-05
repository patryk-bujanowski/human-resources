import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogEntry} from '../../models/blog-entry.model';
import {AuthorizationService} from '../../../shared/authorization/authorization.service';
import {ModalService} from '../../../shared/services/modal.service';
import {BlogRepositoryService} from '../../services/blog-repository.service';
import {FormComponentBase} from '../../../shared/components/form-component-base';
import {BlogEntryEdit} from '../../models/blog-entry-edit.model';
import {VoteMode, VoteType} from "../../models/blog-entry-vote.model";

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

  public get isOwnedByCurrentUser(): boolean {
    return this.authorization.currentUser.id === this.blogEntry.author.id;
  }

  public get isUpvoteEnabled(): boolean {
    return this.downvoteCurrentUserIndex === -1;
  }

  public get isDownvoteEnabled(): boolean {
    return this.upvoteCurrentUserIndex === -1;
  }

  public get upvoteCurrentUserIndex(): number {
    return this.blogEntry.upvotes.indexOf(this.authorization.currentUser.id);
  }

  public get downvoteCurrentUserIndex(): number {
    return this.blogEntry.downvotes.indexOf(this.authorization.currentUser.id);
  }

  public get upvoteClassName(): string {
    return this.upvoteCurrentUserIndex > -1
      ? 'btn btn-sm btn-success'
      : 'btn btn-sm btn-outline-success';
  }

  public get downvoteClassName(): string {
    return this.downvoteCurrentUserIndex > -1
      ? 'btn btn-sm btn-danger'
      : 'btn btn-sm btn-outline-danger';
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

  public deleteBlogEntry(): void {
    const message = 'Czy na pewno chcesz usunąć wybrany wpis?';
    this.showWarning(message)
      .then(result => {
        if (result === 'accept') {
          this.repository.deleteBlogEntry(this.blogEntry.id)
            .subscribe(result => {
              this.reloadBlogEntries.emit();
            }, error => {
              this.handleError(error.message);
            });
        }
      });
  }

  public addUpvote(): void {
    let mode: VoteMode;

    if (this.upvoteCurrentUserIndex > -1) {
      mode = VoteMode.Remove;
    } else {
      mode = VoteMode.Add;
    }

    this.repository.updateVote({
      blogEntryId: this.blogEntry.id,
      userId: this.authorization.currentUser.id,
      type: VoteType.Up,
      mode: mode
    }).subscribe(result => {
      this.blogEntry.upvotes = (result as BlogEntry).upvotes;
    }, error => {
      this.handleError(error.message);
    });
  }

  public addDownvote(): void {
    let mode: VoteMode;

    if (this.downvoteCurrentUserIndex > -1) {
      mode = VoteMode.Remove;
    } else {
      mode = VoteMode.Add;
    }

    this.repository.updateVote({
      blogEntryId: this.blogEntry.id,
      userId: this.authorization.currentUser.id,
      type: VoteType.Down,
      mode: mode
    }).subscribe(result => {
      this.blogEntry.downvotes = (result as BlogEntry).downvotes;
    }, error => {
      this.handleError(error.message);
    });
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
