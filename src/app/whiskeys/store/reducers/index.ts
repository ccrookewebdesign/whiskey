import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromWhiskeys from './whiskeys.reducer';

export interface WhiskeyModuleState {
  whiskeys: fromWhiskeys.WhiskeyState;
}

export const reducers: ActionReducerMap<WhiskeyModuleState> = {
  whiskeys: fromWhiskeys.reducer
};

export const getWhiskeyModuleState = createFeatureSelector<WhiskeyModuleState>(
  'whiskey'
);
