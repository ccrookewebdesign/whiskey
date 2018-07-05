import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromReviews from '../reducers/reviews.reducer';

import { Review } from '../../models/review.model';

export const getReviewState = createSelector(
  fromFeature.getWhiskeyModuleState,
  (state: fromFeature.WhiskeyModuleState) => state.reviews
);

export const getReviewsEntities = createSelector(
  getReviewState,
  fromReviews.getReviewsEntities
);

export const getSelectedReview = createSelector(
  getReviewsEntities,
  fromRoot.getState,
  (entities, router): Review => {
    return (
      router.routerReducer.state &&
      entities[router.routerReducer.state.params.id]
    );
  }
);

export const getAllReviews = createSelector(getReviewsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getReviewsLoading = createSelector(
  getReviewState,
  fromReviews.getReviewsLoading
);

export const getReviewsLoaded = createSelector(
  getReviewState,
  fromReviews.getReviewsLoaded
);

export const getWhiskeyReviews = createSelector(
  getReviewsEntities,
  fromRoot.getState,
  (entities, router): Review[] => {
    return Object.keys(entities)
      .map(id => entities[id])
      .filter(
        review => review.whiskeyid == router.routerReducer.state.params.id
      );
  }
);
