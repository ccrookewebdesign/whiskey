import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../store';

import { Whiskey } from '../models/whiskey.model';

@Injectable()
export class WhiskeyExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.WhiskeyModuleState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.id;
        return this.hasWhiskey(id);
      })
    );
  }

  hasWhiskey(id: string): Observable<boolean> {
    return this.store.select(fromStore.getWhiskeysEntities).pipe(
      map((entities: { [key: string]: Whiskey }) => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getWhiskeysLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadWhiskeys());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
