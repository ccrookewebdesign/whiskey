import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromWhiskeys from '../reducers/whiskeys.reducer';

import { Whiskey } from '../../models/whiskey.model';

export const getWhiskeyState = createSelector(
  fromFeature.getWhiskeyModuleState,
  (state: fromFeature.WhiskeyModuleState) => state.whiskeys
);

export const getWhiskeysEntities = createSelector(
  getWhiskeyState,
  fromWhiskeys.getWhiskeysEntities
);

export const getSelectedWhiskey = createSelector(
  getWhiskeysEntities,
  fromRoot.getState,
  (entities, router): Whiskey => {
    return (
      router.routerReducer.state &&
      entities[router.routerReducer.state.params.id]
    );
  }
);

export const getAllWhiskeys = createSelector(getWhiskeysEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getWhiskeysLoading = createSelector(
  getWhiskeyState,
  fromWhiskeys.getWhiskeysLoading
);

export const getWhiskeysLoaded = createSelector(
  getWhiskeyState,
  fromWhiskeys.getWhiskeysLoaded
);
