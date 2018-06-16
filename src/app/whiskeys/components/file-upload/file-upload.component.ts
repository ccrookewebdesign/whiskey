import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  isHovering: boolean;
  uploadComplete: boolean = false;

  @Output() photoUpload = new EventEmitter<string>();

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    if (file.size > 1200000) {
      console.error('Keep that file size under 1MB please! :( ');
      return;
    }

    const path = new Date().getTime() + '_' + file.name;
    const customMetadata = { app: 'mmmmWhiskey App' };

    this.task = this.storage.upload(path, file, { customMetadata });
    const ref = this.storage.ref(path);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          ref.getDownloadURL().subscribe(url => {
            this.downloadURL = url;
            this.photoUpload.emit(this.downloadURL);
            this.uploadComplete = true;
          });
        }
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
