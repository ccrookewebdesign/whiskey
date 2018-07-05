import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

import * as firebase from 'firebase/app';

import { Whiskey } from '../../models/whiskey.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'review',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <review-form
    [whiskey]="whiskey"
    [user]="user"
    (create)="onCreate($event)"
    (cancel)="onCancel($event)"
    ></review-form>
  `
})
export class ReviewComponent {
  @Input() whiskey: Whiskey;
  @Input() user: any;

  @Output() cancel = new EventEmitter<any>();
  @Output() create = new EventEmitter<Review>();

  constructor(private store: Store<fromStore.WhiskeyModuleState>) {}

  onCreate(review: Review) {
    console.log(review);
    review.create_dt = firebase.firestore.FieldValue.serverTimestamp();
    this.store.dispatch(new fromStore.CreateReview(review));
    this.create.emit(review);
  }

  onCancel(event) {
    this.cancel.emit();
  }
}
