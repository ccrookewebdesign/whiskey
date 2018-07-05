import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../store';
import * as fromStore from '../../store';

import * as userActions from '../../../store/actions/user.action';

import { Whiskey } from '../../models/whiskey.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <review-list [reviews]="reviews$ | async" [uid]="uid | async" (login)="onLogin()"></review-list>
  `
})
export class ReviewsComponent implements OnInit {
  reviews$: Observable<Review[]>;
  uid: Observable<string>;

  @Input() whiskey: Whiskey;

  constructor(
    private root: Store<fromRoot.AppState>,
    private store: Store<fromStore.WhiskeyModuleState>
  ) {}

  ngOnInit() {
    this.reviews$ = this.store.select(fromStore.getWhiskeyReviews);
    this.uid = this.store.select(fromRoot.getUserUid);
  }

  onLogin() {
    this.root.dispatch(new userActions.GoogleLogin());
    this.uid = this.root.select(fromRoot.getUserUid);
  }
}
