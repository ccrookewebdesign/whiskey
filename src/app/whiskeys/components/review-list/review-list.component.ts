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
import { Review } from '../../models/review.model';

import {
  ANM_ROUTE_ENTER,
  routerTransition,
  slideInOutAnimation
} from '../../../router.transition';

@Component({
  selector: 'review-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition, slideInOutAnimation],
  styleUrls: ['review-list.component.scss'],
  templateUrl: 'review-list.component.html'
})
export class ReviewListComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANM_ROUTE_ENTER;
  animationState = 'out';
  runAnimation: boolean = false;
  dateFormat: string = 'MM/dd/yyyy';
  sortByRating: boolean = true;
  sortByDate: boolean = true;
  showReviewForm: string;
  formMessage: string;

  @Input() reviews: Review[];
  @Input() uid: string;

  @Output() login = new EventEmitter<any>();

  ngOnInit() {}

  sortBy(sortby: string) {
    if (sortby === 'rating') {
      let val1 = this.sortByRating ? 1 : -1;
      let val2 = !this.sortByRating ? 1 : -1;
      this.reviews.sort(
        (a, b) => (a.rating < b.rating ? val1 : a.rating > b.rating ? val2 : 0)
      );
      this.sortByRating = !this.sortByRating;
    } else {
      let val1 = this.sortByDate ? 1 : -1;
      let val2 = !this.sortByDate ? 1 : -1;
      this.reviews.sort(
        (a, b) =>
          a.review_dt < b.review_dt
            ? val1
            : a.review_dt > b.review_dt
              ? val2
              : 0
      );
      this.sortByDate = !this.sortByDate;
    }
    this.runAnimation = true;
  }

  onCreate(review) {
    this.formMessage = 'Review Saved';
  }

  onCancel(event) {
    console.log('review list component onCancel');
  }

  onLogin() {
    this.login.emit();
  }

  ngOnDestroy() {
    this.runAnimation = false;
    this.sortByRating = false;
    this.sortByDate = false;
    this.sortBy('review_dt');
  }
}
