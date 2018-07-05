import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
//import 'rxjs/add/observable/throw';

//import * as fromRoot from '../../store';
import * as fromStore from '../store/';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Review } from '../models/review.model';

@Injectable()
export class ReviewsService {
  uid: string;

  constructor(
    private afs: AngularFirestore,
    private store: Store<fromStore.WhiskeyModuleState>
  ) {
    //this.store.select(fromRoot.getUserUid).subscribe(uid => (this.uid = uid));
  } // private http: HttpReview,

  getReviews(): Observable<Review[]> {
    const ref = this.afs.collection<Review>('reviews', ref =>
      ref.orderBy('review_dt', 'desc')
    );

    return ref.snapshotChanges().pipe(
      map(arr => {
        //console.log(arr);
        return arr.map(doc => {
          const data = doc.payload.doc.data();
          data.id = doc.payload.doc.id;
          return { id: doc.payload.doc.id, ...data } as Review;
        });
      })
    );

    /* console.log('x: ' + JSON.stringify(x));
    return x; */
  }

  createReview(payload: Review): Observable<Review> {
    const ref = this.afs.collection('reviews').add(payload);
    return of<Review>(payload);
  }

  updateReview(payload: Review): Observable<Review> {
    const ref = this.afs.doc<Review>(`reviews/${payload.id}`).update(payload);
    return of<Review>(payload);
  }

  removeReview(payload: Review): Observable<Review> {
    const ref = this.afs.doc<Review>(`reviews/${payload.id}`).ref.delete();
    return of<Review>(payload);
  }

  /* getReviewCollection(): Observable<Review[]> {
    let reviewsCollection$: Observable<Review[]>;
    return (reviewsCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllReviews),
      this.store.select(fromStore.getShowArchived),
      this.store.select(fromStore.getAllInvoices),
      (reviews: any[], showArchived: any, invoices: any[]) => {
        if (!showArchived) {
          return reviews
            .map(review => {
              let reviewInvoices: Invoice[] = invoices.filter(
                invoice => invoice.reviewId === review.id
              );

              return { ...review, invoices: reviewInvoices };
            })
            .filter(
              review => review.active === !showArchived //? true || false : !showArchived
            );
        } else {

        }
      }
    ));
  } */
}
