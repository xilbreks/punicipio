import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { DialogToConfirm } from './../debate-en-curso/debate-en-curso.component';;

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

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private db: AngularFireDatabase) {
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

  openModal(): void {
    let dialogRef = this.dialog.open(DialogToConfirm, {
      data: { titulo: `Iniciar el debate "${this.debate.titulo}"` }
    });

    dialogRef.afterClosed().subscribe(accept => {
      if (accept) {
        this.db.object(`/punicipio/debates/${this.route.snapshot.params['id']}`)
          .update({
            estado: 'en-curso',
            actividad: 'enLectura'
          })
          .then(arg => {
            this.router.navigate(['./../../debate-en-curso'], { relativeTo: this.route })
          })
          .catch(err => {
            console.log('error')
          })
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.debateSubscription.unsubscribe();
  }

}