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

import { Whiskey } from '../models/whiskey.model';

@Injectable()
export class WhiskeysService {
  uid: string;

  constructor(
    private afs: AngularFirestore,
    private store: Store<fromStore.WhiskeyModuleState>
  ) {
    //this.store.select(fromRoot.getUserUid).subscribe(uid => (this.uid = uid));
  } // private http: HttpWhiskey,

  getWhiskeys(): Observable<Whiskey[]> {
    const ref = this.afs.collection<Whiskey>('whiskeys', ref =>
      ref.orderBy('long_name')
    );

    return ref.snapshotChanges().pipe(
      map(arr => {
        //console.log(arr);
        return arr.map(doc => {
          const data = doc.payload.doc.data();
          data.id = doc.payload.doc.id;
          return { id: doc.payload.doc.id, ...data } as Whiskey;
        });
      })
    );

    /* console.log('x: ' + JSON.stringify(x));
    return x; */
  }

  createWhiskey(payload: Whiskey): Observable<Whiskey> {
    const ref = this.afs.collection('whiskeys').add(payload);
    return of<Whiskey>(payload);
  }

  updateWhiskey(payload: Whiskey): Observable<Whiskey> {
    const ref = this.afs.doc<Whiskey>(`whiskeys/${payload.id}`).update(payload);
    return of<Whiskey>(payload);
  }

  removeWhiskey(payload: Whiskey): Observable<Whiskey> {
    const ref = this.afs.doc<Whiskey>(`whiskeys/${payload.id}`).ref.delete();
    return of<Whiskey>(payload);
  }

  /* getWhiskeyCollection(): Observable<Whiskey[]> {
    let whiskeysCollection$: Observable<Whiskey[]>;
    return (whiskeysCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllWhiskeys),
      this.store.select(fromStore.getShowArchived),
      this.store.select(fromStore.getAllInvoices),
      (whiskeys: any[], showArchived: any, invoices: any[]) => {
        if (!showArchived) {
          return whiskeys
            .map(whiskey => {
              let whiskeyInvoices: Invoice[] = invoices.filter(
                invoice => invoice.whiskeyId === whiskey.id
              );

              return { ...whiskey, invoices: whiskeyInvoices };
            })
            .filter(
              whiskey => whiskey.active === !showArchived //? true || false : !showArchived
            );
        } else {

        }
      }
    ));
  } */
}
