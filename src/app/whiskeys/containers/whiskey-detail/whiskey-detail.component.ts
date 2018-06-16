import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import * as fromRoot from '../../../store';
import * as fromStore from '../../store';

import * as firebase from 'firebase/app';

import { Whiskey } from '../../models/whiskey.model';

@Component({
  selector: 'whiskey-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <whiskey-form
    [whiskey]="whiskey$ | async"
    (create)="onCreate($event)"
    (update)="onUpdate($event)"
    (remove)="onRemove($event)"
    (cancel)="onCancel($event)">
  </whiskey-form>
  `
})
export class WhiskeyDetailComponent implements OnInit, OnDestroy {
  whiskey$: Observable<Whiskey>;
  //photo_path: string;

  constructor(private store: Store<fromStore.WhiskeyModuleState>) {}

  ngOnInit() {
    this.whiskey$ = this.store.select(fromStore.getSelectedWhiskey);
  }

  /* onPhotoUpload(event: string) {
    this.photo_path =
      environment.photo_path + event + environment.photo_path_param;
  } */

  onCreate(event: Whiskey) {
    event.createDate = firebase.firestore.FieldValue.serverTimestamp();
    this.store
      .select(fromRoot.getUserUid)
      .subscribe(uid => (event.created_by = uid)).unsubscribe;
    this.store.dispatch(new fromStore.CreateWhiskey(event));
  }

  onUpdate(event: Whiskey) {
    this.store.dispatch(new fromStore.UpdateWhiskey(event));
  }

  onRemove(event: Whiskey) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveWhiskey(event));
    }
  }

  onCancel(event: Whiskey) {
    this.store.dispatch(new fromRoot.Back());
  }

  ngOnDestroy() {}
}
