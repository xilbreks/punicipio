import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DebatesService {

  private _debatesPendientes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _debatesFinalizados: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _debatesEnCurso: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  debatesPendientes: Observable<any[]> = this._debatesPendientes.asObservable();
  debatesFinalizados: Observable<any[]> = this._debatesFinalizados.asObservable();
  debatesEnCurso: Observable<any[]> = this._debatesEnCurso.asObservable();

  constructor(db: AngularFireDatabase) {
    db.list('/punicipio/debates', ref => ref.orderByChild('estado').equalTo('pendiente'))
      .snapshotChanges()
      .map(items => items.map(i => ({ key: i.payload.key, ...i.payload.val() })))
      .subscribe((items) => {
        this._debatesPendientes.next(items)
      })

    db.list('/punicipio/debates', ref => ref.orderByChild('estado').equalTo('finalizado'))
      .snapshotChanges()
      .map(items => items.map(i => ({ key: i.payload.key, ...i.payload.val() })))
      .subscribe((items) => {
        this._debatesFinalizados.next(items)
      })

    db.list('/punicipio/debates', ref => ref.orderByChild('estado').equalTo('en-curso'))
      .snapshotChanges()
      .map(items => items.map(i => ({ key: i.payload.key, ...i.payload.val() })))
      .subscribe((items) => {
        this._debatesEnCurso.next(items)
      })
  }

}
