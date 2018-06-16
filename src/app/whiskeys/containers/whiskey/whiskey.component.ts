import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../store';
import * as fromStore from '../../store';

import { Whiskey } from '../../models/whiskey.model';

@Component({
  selector: 'whiskey',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <whiskey-display [whiskey]="whiskey | async" [uid]="uid | async"></whiskey-display>
  `
})
export class WhiskeyComponent implements OnInit {
  photo_path: string;
  whiskey: Observable<Whiskey>;
  uid: Observable<string>;

  constructor(private store: Store<fromStore.WhiskeyModuleState>) {}

  ngOnInit() {
    this.whiskey = this.store.select(fromStore.getSelectedWhiskey);
    this.uid = this.store.select(fromRoot.getUserUid);
  }
}
