import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../store';
import * as reviewActions from '../actions/reviews.action';
import * as fromServices from '../../services';

@Injectable()
export class ReviewsEffects {
  constructor(
    private actions$: Actions,
    private reviewService: fromServices.ReviewsService
  ) {}

  @Effect()
  loadReviews$ = this.actions$.ofType(reviewActions.LOAD_REVIEWS).pipe(
    switchMap(() => {
      return this.reviewService.getReviews().pipe(
        /*  map(reviews => {
          console.log(reviews);
        }), */
        map(reviews => new reviewActions.LoadReviewsSuccess(reviews)),
        catchError(error => of(new reviewActions.LoadReviewsFail(error)))
      );
    })
  );

  @Effect()
  createReview$ = this.actions$.ofType(reviewActions.CREATE_REVIEW).pipe(
    map((action: reviewActions.CreateReview) => action.payload),
    switchMap(review => {
      return this.reviewService.createReview(review).pipe(
        map(review => new reviewActions.CreateReviewSuccess(review)),
        catchError(error => of(new reviewActions.CreateReviewFail(error)))
      );
    })
  );

  /* @Effect()
  createReviewSuccess$ = this.actions$
    .ofType(reviewActions.CREATE_REVIEW_SUCCESS)
    .pipe(
      map((action: reviewActions.CreateReviewSuccess) => action.payload),
      map(
        review =>
          new fromRoot.Go({
            path: ['']
          })
      )
    ); */

  @Effect()
  updateReview$ = this.actions$.ofType(reviewActions.UPDATE_REVIEW).pipe(
    map((action: reviewActions.UpdateReview) => action.payload),
    switchMap(review => {
      return this.reviewService.updateReview(review).pipe(
        map(review => new reviewActions.UpdateReviewSuccess(review)),
        catchError(error => of(new reviewActions.UpdateReviewFail(error)))
      );
    })
  );

  @Effect()
  removeReview$ = this.actions$.ofType(reviewActions.REMOVE_REVIEW).pipe(
    map((action: reviewActions.RemoveReview) => action.payload),
    switchMap(review => {
      return this.reviewService.removeReview(review).pipe(
        map(() => new reviewActions.RemoveReviewSuccess(review)),
        catchError(error => of(new reviewActions.RemoveReviewFail(error)))
      );
    })
  );

  /* @Effect()
  handleReviewSuccess = this.actions$
    .ofType(
      reviewActions.UPDATE_REVIEW_SUCCESS,
      reviewActions.REMOVE_REVIEW_SUCCESS
    )
    .pipe(
      map(review => {
        return new fromRoot.Go({
          path: ['reviews']
        });
      })
    ); */
}
