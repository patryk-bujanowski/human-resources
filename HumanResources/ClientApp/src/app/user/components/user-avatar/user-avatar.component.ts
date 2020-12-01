import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {

  public progress: number;
  public message: string;

  @Output()
  public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public uploadAvatar(files: File[]): void {
    if (files.length === 0) {
      return;
    }

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);

    const url = environment.apiUrl + '/api/user/avatar';
    this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = 'Przesyłanie zakończone.';
        this.onUploadFinished.emit(event.body);
      }
    });
  }

}
