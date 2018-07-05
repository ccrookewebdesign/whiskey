import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StarRatingModule } from 'angular-star-rating';

import * as fromGuards from './guards';
import * as fromDirectives from './directives';
import * as fromPipes from './pipes';
import * as fromContainers from './containers';
import * as fromComponents from './components';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.WhiskeysComponent,
    canActivate: [fromGuards.WhiskeysGuard, fromGuards.ReviewsGuard]
  },
  {
    path: ':id',
    component: fromContainers.WhiskeyComponent,
    canActivate: [fromGuards.WhiskeyExistsGuard, fromGuards.ReviewsGuard]
  },
  {
    path: 'edit/new',
    component: fromContainers.WhiskeyDetailComponent,
    canActivate: [fromGuards.AuthGuard]
  },
  {
    path: 'edit/:id',
    component: fromContainers.WhiskeyDetailComponent,
    canActivate: [fromGuards.AuthGuard, fromGuards.WhiskeyExistsGuard]
  },
  {
    path: 'reviews',
    component:
      fromContainers.ReviewsComponent /* ,
    canActivate: [fromGuards.WhiskeysGuard, fromGuards.ReviewsGuard] */
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StarRatingModule.forRoot()
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromDirectives.directives,
    ...fromPipes.pipes
  ],
  providers: [...fromGuards.guards],
  exports: [RouterModule]
})
export class WhiskeysRoutingModule {}
