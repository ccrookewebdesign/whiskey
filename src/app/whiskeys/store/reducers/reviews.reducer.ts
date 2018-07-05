import * as fromReviews from '../actions/reviews.action';
import { Review } from '../../models/review.model';

export interface ReviewState {
  entities: { [id: string]: Review };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ReviewState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromReviews.ReviewsAction
): ReviewState {
  switch (action.type) {
    case fromReviews.LOAD_REVIEWS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromReviews.LOAD_REVIEWS_SUCCESS: {
      const reviews = action.payload;

      const entities = reviews.reduce(
        (entities: { [id: string]: Review }, review: Review) => {
          return {
            ...entities,
            [review.id]: review
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromReviews.LOAD_REVIEWS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromReviews.REMOVE_REVIEW_SUCCESS: {
      const review = action.payload;
      const { [review.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getReviewsEntities = (state: ReviewState) => state.entities;
export const getReviewsLoading = (state: ReviewState) => state.loading;
export const getReviewsLoaded = (state: ReviewState) => state.loaded;
