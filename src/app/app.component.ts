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

  onActivate(event) {
    this.showMenu = false;
     
        window.scroll(0,0);
  }

  onDeactivate() {
    //this.renderer.setProperty(document.body, 'scrollTop', 0);
    /* let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 1); */
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
