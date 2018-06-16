import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { ANM_ROUTE_ENTER, routerTransition } from '../../../router.transition';

import { Whiskey } from '../../models/whiskey.model';

@Component({
  selector: 'whiskey-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
  styleUrls: ['whiskey-display.component.scss'],
  templateUrl: 'whiskey-display.component.html'
})
export class WhiskeyDisplayComponent implements OnInit {
  animateOnRouteEnter = ANM_ROUTE_ENTER;
  photo_path: string;

  @Input() whiskey: Whiskey;
  @Input() uid: string;

  constructor() {}

  ngOnInit() {
    if (this.whiskey) {
      this.photo_path = this.whiskey.photo;
    }
  }
}
