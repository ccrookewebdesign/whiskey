import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface AppState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  routerReducer: fromRouter.routerReducer,
  user: fromUser.reducer
};

export const getState = createFeatureSelector<AppState>('appstate');
//export const getRouterState = createFeatureSelector<AppState>('routerReducer');
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParams, params };
  }
}
