import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy
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
export class WhiskeyListComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANM_ROUTE_ENTER;
  animationState = 'out';
  runAnimation: boolean = false;
  dateFormat: string = 'MM/dd/yyyy';
  sortByName: boolean = true;
  sortByRating: boolean = true;
  showReviewForm: string;
  formMessage: string;
  reviewedId: string;

  @Input() whiskeys: Whiskey[];
  @Input() user: any;

  @Output() login = new EventEmitter<any>();

  ngOnInit() {}

  sortBy(sortby: string) {
    if (sortby === 'whiskey') {
      let val1 = this.sortByName ? 1 : -1;
      let val2 = !this.sortByName ? 1 : -1;
      this.whiskeys.sort(
        (a, b) =>
          a.long_name < b.long_name
            ? val1
            : a.long_name > b.long_name
              ? val2
              : 0
      );
      this.sortByName = !this.sortByName;
    } else {
      let val1 = this.sortByRating ? 1 : -1;
      let val2 = !this.sortByRating ? 1 : -1;
      this.whiskeys.sort(
        (a, b) =>
          a.avg_rating < b.avg_rating
            ? val1
            : a.avg_rating > b.avg_rating
              ? val2
              : 0
      );
      this.sortByRating = !this.sortByRating;
    }
    this.runAnimation = true;
  }

  toggleShowDiv(id: string) {
    this.formMessage = '';
    if (this.showReviewForm && this.showReviewForm != id) {
      this.animationState = this.animationState === 'in' ? 'out' : 'out';
    }
    this.showReviewForm = id;

    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    //console.log(this.animationState);
  }

  onCreate(review) {
    this.formMessage = 'Review Saved';
    this.reviewedId = review.whiskeyid;

    this.delay(3000).then(any => {
      this.clearReview();
    });
    /* setTimeout(() => {
      this.clearReview();
    }, 3250); */
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() =>
      console.log('fired')
    );
  }

  onCancel(event) {
    this.toggleShowDiv(this.showReviewForm);
  }

  onLogin() {
    this.login.emit();
  }

  clearReview() {
    this.formMessage = 'XXX';
    this.animationState = 'in';
    //this.showReviewForm = '';
    //this.toggleShowDiv(this.showReviewForm);
  }

  ngOnDestroy() {
    this.runAnimation = false;
    this.sortByName = false;
    this.sortBy('whiskey');
  }
}
