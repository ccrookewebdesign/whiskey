import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { WhiskeysRoutingModule } from './whiskeys-routing.module';

import * as fromServices from './services';

@NgModule({
  imports: [
    WhiskeysRoutingModule,
    StoreModule.forFeature('whiskey', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services]
})
export class WhiskeysModule {}
