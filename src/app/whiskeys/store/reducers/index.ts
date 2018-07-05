import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromWhiskeys from './whiskeys.reducer';
import * as fromReviews from './reviews.reducer';

export interface WhiskeyModuleState {
  whiskeys: fromWhiskeys.WhiskeyState;
  reviews: fromReviews.ReviewState;
}

export const reducers: ActionReducerMap<WhiskeyModuleState> = {
  whiskeys: fromWhiskeys.reducer,
  reviews: fromReviews.reducer
};

export const getWhiskeyModuleState = createFeatureSelector<WhiskeyModuleState>(
  'whiskey'
);
