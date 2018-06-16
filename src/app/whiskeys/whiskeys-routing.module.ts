import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import * as fromGuards from './guards';
import * as fromDirectives from './directives';
import * as fromPipes from './pipes';
import * as fromContainers from './containers';
import * as fromComponents from './components';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.WhiskeysComponent,
    canActivate: [fromGuards.WhiskeysGuard]
  },
  {
    path: ':id',
    component: fromContainers.WhiskeyComponent,
    canActivate: [fromGuards.WhiskeyExistsGuard]
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
  }
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
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
