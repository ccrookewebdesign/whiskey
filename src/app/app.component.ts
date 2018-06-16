import { Component, Renderer2 } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from '../app/store';

import { ANM_ROUTE_ENTER, routerTransition } from './router.transition';

import * as userActions from '../app/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  user$: Observable<any>;
  test: any;
  showMenu: boolean = false;
  animateOnRouteEnter = ANM_ROUTE_ENTER;

  constructor(
    private renderer: Renderer2,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUser);
    this.store.dispatch(new userActions.GetUser());
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  changeOfRoutes() {
    this.showMenu = false;
  }

  onDeactivate() {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  googleLogin() {
    this.showMenu = false;
    this.store.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.showMenu = false;
    this.store.dispatch(new userActions.Logout());
    /* return new fromStore.Go({
      path: ['']
    }); */
  }
}
