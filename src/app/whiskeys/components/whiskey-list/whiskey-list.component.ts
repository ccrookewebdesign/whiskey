import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Whiskey } from '../../models/whiskey.model';

import {
  ANM_ROUTE_ENTER,
  routerTransition,
  slideInOutAnimation
} from '../../../router.transition';

@Component({
  selector: 'whiskey-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition, slideInOutAnimation],
  styleUrls: ['whiskey-list.component.scss'],
  templateUrl: 'whiskey-list.component.html'
})
export class WhiskeyListComponent implements OnInit {
  animateOnRouteEnter = ANM_ROUTE_ENTER;
  animationState = 'out';
  dateFormat: string = 'MM/dd/yyyy';
  sortByName: boolean = true;
  showReviewForm: string;

  @Input() whiskeys: Whiskey[];
  @Input() uid: string;

  @Output() login = new EventEmitter<any>();

  ngOnInit() {}

  sortBy(sortby: string) {
    let val1 = this.sortByName ? 1 : -1;
    let val2 = !this.sortByName ? 1 : -1;
    this.whiskeys.sort(
      (a, b) =>
        a.long_name < b.long_name ? val1 : a.long_name > b.long_name ? val2 : 0
    );
    this.sortByName = !this.sortByName;
  }

  toggleShowDiv(divName: string, id: string) {
    this.showReviewForm = id;

    console.log(id);

    if (divName === id) {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'in';
      console.log(this.animationState);
    }
  }

  onLogin() {
    this.login.emit();
  }
}
