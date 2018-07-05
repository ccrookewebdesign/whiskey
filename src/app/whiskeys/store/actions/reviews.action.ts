import { Action } from '@ngrx/store';

import { Review } from '../../models/review.model';

export const LOAD_REVIEWS = '[Reviews] Load Reviews';
export const LOAD_REVIEWS_FAIL = '[Reviews] Load Reviews Fail';
export const LOAD_REVIEWS_SUCCESS = '[Reviews] Load Reviews Success';

export class LoadReviews implements Action {
  readonly type = LOAD_REVIEWS;
}

export class LoadReviewsFail implements Action {
  readonly type = LOAD_REVIEWS_FAIL;
  constructor(public payload: any) {}
}

export class LoadReviewsSuccess implements Action {
  readonly type = LOAD_REVIEWS_SUCCESS;
  constructor(public payload: Review[]) {}
}

export const CREATE_REVIEW = '[Reviews] Create Review';
export const CREATE_REVIEW_FAIL = '[Reviews] Create Review Fail';
export const CREATE_REVIEW_SUCCESS = '[Reviews] Create Review Success';

export class CreateReview implements Action {
  readonly type = CREATE_REVIEW;
  constructor(public payload: Review) {}
}

export class CreateReviewFail implements Action {
  readonly type = CREATE_REVIEW_FAIL;
  constructor(public payload: any) {}
}

export class CreateReviewSuccess implements Action {
  readonly type = CREATE_REVIEW_SUCCESS;
  constructor(public payload: Review) {}
}

export const UPDATE_REVIEW = '[Reviews] Update Review';
export const UPDATE_REVIEW_FAIL = '[Reviews] Update Review Fail';
export const UPDATE_REVIEW_SUCCESS = '[Reviews] Update Review Success';

export class UpdateReview implements Action {
  readonly type = UPDATE_REVIEW;
  constructor(public payload: Review) {}
}

export class UpdateReviewFail implements Action {
  readonly type = UPDATE_REVIEW_FAIL;
  constructor(public payload: any) {}
}

export class UpdateReviewSuccess implements Action {
  readonly type = UPDATE_REVIEW_SUCCESS;
  constructor(public payload: Review) {}
}

export const REMOVE_REVIEW = '[Reviews] Remove Review';
export const REMOVE_REVIEW_FAIL = '[Reviews] Remove Review Fail';
export const REMOVE_REVIEW_SUCCESS = '[Reviews] Remove Review Success';

export class RemoveReview implements Action {
  readonly type = REMOVE_REVIEW;
  constructor(public payload: Review) {}
}

export class RemoveReviewFail implements Action {
  readonly type = REMOVE_REVIEW_FAIL;
  constructor(public payload: any) {}
}

export class RemoveReviewSuccess implements Action {
  readonly type = REMOVE_REVIEW_SUCCESS;
  constructor(public payload: Review) {}
}

export type ReviewsAction =
  | LoadReviews
  | LoadReviewsFail
  | LoadReviewsSuccess
  | CreateReview
  | CreateReviewFail
  | CreateReviewSuccess
  | UpdateReview
  | UpdateReviewFail
  | UpdateReviewSuccess
  | RemoveReview
  | RemoveReviewFail
  | RemoveReviewSuccess;
