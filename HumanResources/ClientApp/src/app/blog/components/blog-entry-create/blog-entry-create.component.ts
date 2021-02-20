import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BlogRepositoryService } from '../../services/blog-repository.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { ModalService } from '../../../shared/services/modal.service';
import { BlogEntryCreate } from '../../models/blog-entry-create.model';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';

@Component({
  selector: 'app-blog-entry-create',
  templateUrl: './blog-entry-create.component.html',
  styleUrls: ['./blog-entry-create.component.css']
})
export class BlogEntryCreateComponent extends FormComponentBase implements OnInit {

  @Output()
  public reloadBlogEntries = new EventEmitter();

  public blogEntryCreateForm: FormGroup;

  constructor(private repository: BlogRepositoryService,
    private authorization: AuthorizationService,
    protected modal: ModalService) {
    super(modal);
   }

  ngOnInit(): void {
    this.blogEntryCreateForm = new FormGroup({
      content: new FormControl('', [Validators.required])
    })
  }

  public createBlogEntry(blogEntryFormValue): void {
    const blogEntry: BlogEntryCreate = {
      authorId: this.authorization.currentUser.id,
      content: blogEntryFormValue.content
    };

    this.repository.createBlogEntry(blogEntry)
      .subscribe(result => {
        this.reloadBlogEntries.emit();
        this.blogEntryCreateForm.reset();
      }, error => {
        this.handleError(error.message);
      });


  }

}
