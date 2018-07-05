import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Whiskey } from '../../models/whiskey.model';
//import { Review } from '../../models/review.model';

@Component({
  selector: 'review-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['review-form.component.scss'],
  templateUrl: 'review-form.component.html'
})
export class ReviewFormComponent {
  exists = false;

  @Input() whiskey: Whiskey;
  @Input() user: any;
  @Output() create = new EventEmitter<Whiskey>();
  @Output() cancel = new EventEmitter<any>();

  form = this.fb.group({
    uid: [''],
    uname: [''],
    whiskeyid: [''],
    create_dt: [''],
    review_dt: [
      formatDate(new Date(), 'M/dd/yyyy', 'en-US'),
      Validators.required
    ],
    rating: [0, [Validators.required, Validators.max(5), Validators.min(1)]],
    location: ['', Validators.required],
    purchased_as: ['Bottle', Validators.required],
    price: [0, Validators.required],
    notes: ['', [Validators.required, Validators.maxLength(200)]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue({
      uid: this.user.uid,
      uname: this.user.displayName,
      whiskeyid: this.whiskey.id
    });
    console.log(this.form);
  }

  createReview(review: FormGroup) {
    const { value, valid } = review;
    if (valid) {
      this.create.emit(value);
    }
  }

  cancelReview(form: FormGroup) {
    this.cancel.emit();
  }
}
