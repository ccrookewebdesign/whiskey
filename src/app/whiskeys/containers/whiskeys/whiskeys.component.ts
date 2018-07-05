import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../store';
import * as fromStore from '../../store';

import * as fromServices from '../../services';

import * as userActions from '../../../store/actions/user.action';

import { Whiskey } from '../../models/whiskey.model';

@Component({
  selector: 'whiskeys',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <whiskey-list [whiskeys]="whiskeys$ | async" [user]="user | async" (login)="onLogin()"></whiskey-list>
  `
})
export class WhiskeysComponent implements OnInit {
  whiskeys$: Observable<Whiskey[]>;
  user: Observable<any>;

  constructor(
    private root: Store<fromRoot.AppState>,
    private store: Store<fromStore.WhiskeyModuleState>,
    private whiskeyService: fromServices.WhiskeysService
  ) {}

  ngOnInit() {
    //this.whiskeys$ = this.store.select(fromStore.getAllWhiskeys);
    this.whiskeys$ = this.whiskeyService.getWhiskeyCollection();
    this.user = this.store.select(fromRoot.getUser);
  }

  sortBy() {
    return false;
  }

  onLogin() {
    this.root.dispatch(new userActions.GoogleLogin());
    this.user = this.root.select(fromRoot.getUser);
  }
}
