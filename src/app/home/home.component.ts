import { Component } from '@angular/core';

import { ANM_ROUTE_ENTER, routerTransition } from '../router.transition';

@Component({
  selector: 'home',
  animations: [routerTransition],
  styles: [],
  template: `
  <div class="w-full">
    <div [ngClass]="animateOnRouteEnter">
      <img class="z-0 w-full" style="z-index: 0" src="/assets/i/whiskey-02.gif">
    </div>
    <div class="my-3 mx-3">
      <h2 class="mb-2 font-medium" [ngClass]="animateOnRouteEnter">Welcome to mmmmWhiskey!</h2>
      <p class="mb-2" [ngClass]="animateOnRouteEnter">
        This will be an intro paragraph explaining how you can log your descent into alcoholism.
      </p>
      <p [ngClass]="animateOnRouteEnter">
        <a [routerLink]="['/whiskeys']">On to the whiskeys</a>
      </p>
    </div>
  </div>
  `
})
export class HomeComponent {
  animateOnRouteEnter = ANM_ROUTE_ENTER;

  constructor() {}
}
