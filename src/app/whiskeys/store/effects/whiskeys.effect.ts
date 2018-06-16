import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../store';
import * as whiskeyActions from '../actions/whiskeys.action';
import * as fromServices from '../../services';

@Injectable()
export class WhiskeysEffects {
  constructor(
    private actions$: Actions,
    private whiskeyService: fromServices.WhiskeysService
  ) {}

  @Effect()
  loadWhiskeys$ = this.actions$.ofType(whiskeyActions.LOAD_WHISKEYS).pipe(
    switchMap(() => {
      return this.whiskeyService.getWhiskeys().pipe(
        /*  map(whiskeys => {
          console.log(whiskeys);
        }), */
        map(whiskeys => new whiskeyActions.LoadWhiskeysSuccess(whiskeys)),
        catchError(error => of(new whiskeyActions.LoadWhiskeysFail(error)))
      );
    })
  );

  @Effect()
  createWhiskey$ = this.actions$.ofType(whiskeyActions.CREATE_WHISKEY).pipe(
    map((action: whiskeyActions.CreateWhiskey) => action.payload),
    switchMap(whiskey => {
      return this.whiskeyService.createWhiskey(whiskey).pipe(
        map(whiskey => new whiskeyActions.CreateWhiskeySuccess(whiskey)),
        catchError(error => of(new whiskeyActions.CreateWhiskeyFail(error)))
      );
    })
  );

  @Effect()
  createWhiskeySuccess$ = this.actions$
    .ofType(whiskeyActions.CREATE_WHISKEY_SUCCESS)
    .pipe(
      map((action: whiskeyActions.CreateWhiskeySuccess) => action.payload),
      map(
        whiskey =>
          new fromRoot.Go({
            path: ['']
          })
      )
    );

  @Effect()
  updateWhiskey$ = this.actions$.ofType(whiskeyActions.UPDATE_WHISKEY).pipe(
    map((action: whiskeyActions.UpdateWhiskey) => action.payload),
    switchMap(whiskey => {
      return this.whiskeyService.updateWhiskey(whiskey).pipe(
        map(whiskey => new whiskeyActions.UpdateWhiskeySuccess(whiskey)),
        catchError(error => of(new whiskeyActions.UpdateWhiskeyFail(error)))
      );
    })
  );

  @Effect()
  removeWhiskey$ = this.actions$.ofType(whiskeyActions.REMOVE_WHISKEY).pipe(
    map((action: whiskeyActions.RemoveWhiskey) => action.payload),
    switchMap(whiskey => {
      return this.whiskeyService.removeWhiskey(whiskey).pipe(
        map(() => new whiskeyActions.RemoveWhiskeySuccess(whiskey)),
        catchError(error => of(new whiskeyActions.RemoveWhiskeyFail(error)))
      );
    })
  );

  @Effect()
  handleWhiskeySuccess = this.actions$
    .ofType(
      whiskeyActions.UPDATE_WHISKEY_SUCCESS,
      whiskeyActions.REMOVE_WHISKEY_SUCCESS
    )
    .pipe(
      map(whiskey => {
        return new fromRoot.Go({
          path: ['whiskeys']
        });
      })
    );
}
