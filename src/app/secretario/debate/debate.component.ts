import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.css']
})
export class DebateComponent implements OnInit, OnDestroy {

  id: string;
  debate: any = {
    titulo: 'Titulo',
    estado: '',
    agenda: [],
    fecha: new Date()
  }

  debateSubscription: Subscription;

  constructor(private route: ActivatedRoute, db: AngularFireDatabase) {
    this.id = this.route.snapshot.params['id'];
    this.debateSubscription = db.object(`/punicipio/debates/${this.id}`).valueChanges()
      .subscribe((debate: any) => {
        if (debate) {
          this.debate = {
            titulo: debate.titulo,
            estado: debate.estado,
            agenda: debate.agenda.split(';').map(d => d.trim()).filter(d => !!d),
            fecha: new Date(debate.fecha)
          };
        }
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.debateSubscription.unsubscribe();
  }

}
