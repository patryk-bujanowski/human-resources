import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogEntry } from '../../models/blog-entry.model';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { ModalService } from '../../../shared/services/modal.service';
import { BlogRepositoryService } from '../../services/blog-repository.service';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { BlogEntryEdit } from '../../models/blog-entry-edit.model';
import { BlogEntryVoteCreate } from '../../models/blog-entry-vote-create.model';
import { BlogEntryVote, VoteType } from '../../models/blog-entry-vote.model';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent extends FormComponentBase implements OnInit {

  private contentOldValue: string;

  @Input()
  public blogEntry: BlogEntry;

  @Output()
  public reloadBlogEntries = new EventEmitter();

  public isEditMode: boolean = false;

  public get currentUserId(): string {
    return this.authorization.currentUser.id;
  }

  public get currentUserVote(): BlogEntryVote {
    for (let i = 0; i < this.blogEntry.votes.length; i++) {
      if (this.blogEntry.votes[i].userId === this.currentUserId) {
        return this.blogEntry.votes[i];
      }
    }

    return null;
  }

  public get upVotesCount(): number {
    let result = 0;

    this.blogEntry.votes.forEach(vote => {
      if (vote.type === VoteType.Up) {
        result++;
      }
    });

    return result;
  }

  public get downVotesCount(): number {
    let result = 0;

    this.blogEntry.votes.forEach(vote => {
      if (vote.type === VoteType.Down) {
        result++;
      }
    });

    return result;
  }

  public get isModifiedVisible(): boolean {
    return this.blogEntry.creationDate !== this.blogEntry.modificationDate;
  }

  public get isOwnedByCurrentUser(): boolean {
    return this.currentUserId === this.blogEntry.author.id;
  }

  public get isVoteEnabled(): boolean {
    return !this.checkIfUserHasVoted();
  }

  public checkIfUserHasVoted(): boolean {
    return this.currentUserVote !== null;
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

  public addVote(type: string): void {
    let voteType: VoteType;

    if (type === 'up') {
      voteType = VoteType.Up
    } else if (type === 'down') {
      voteType = VoteType.Down;
    } else {
      voteType = undefined;
    }

    if (voteType !== undefined) {
      const vote: BlogEntryVoteCreate = {
        blogEntryId: this.blogEntry.id,
        userId: this.currentUserId,
        type: voteType
      };

      this.repository.addVote(vote)
        .subscribe(result => {
          this.blogEntry.votes = result as BlogEntryVote[];
        }, error => {
          this.handleError(error.message);
        });
    }
  }

  public deleteVote(): void {
    const vote = this.currentUserVote;
    if (vote != null) {
      this.repository.deleteVote(vote.id)
        .subscribe(result => {
          this.blogEntry.votes = result as BlogEntryVote[];
        }, error => {
          this.handleError(error.message);
        });
    }
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
