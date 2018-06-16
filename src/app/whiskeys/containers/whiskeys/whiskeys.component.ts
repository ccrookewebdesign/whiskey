import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../store';
import * as fromStore from '../../store';

import * as userActions from '../../../store/actions/user.action';

import { Whiskey } from '../../models/whiskey.model';

@Component({
  selector: 'whiskeys',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <whiskey-list [whiskeys]="whiskeys$ | async" [uid]="uid | async" (login)="onLogin()"></whiskey-list>
  `
})
export class WhiskeysComponent implements OnInit {
  showArchived$: Observable<boolean>;
  whiskeys$: Observable<Whiskey[]>;
  uid: Observable<string>;

  constructor(
    private root: Store<fromRoot.AppState>,
    private store: Store<fromStore.WhiskeyModuleState>
  ) {}

  ngOnInit() {
    this.whiskeys$ = this.store.select(fromStore.getAllWhiskeys);
    this.uid = this.store.select(fromRoot.getUserUid);
  }

  sortBy() {
    return false;
  }

  onLogin() {
    this.root.dispatch(new userActions.GoogleLogin());
    this.uid = this.root.select(fromRoot.getUserUid);
  }
}
