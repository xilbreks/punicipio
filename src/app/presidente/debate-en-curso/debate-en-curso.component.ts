import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { trigger, style, state, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { AngularFireDatabase } from 'angularfire2/database';

import { DebatesService } from './../debates.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-debate-en-curso',
  templateUrl: './debate-en-curso.component.html',
  styleUrls: ['./debate-en-curso.component.css'],
  animations: [
    trigger('participacionButton', [
      state('enLectura', style({ transform: 'translateX(-100%)' })),
      state('enParticipacion', style({ transform: 'translateX(0px)' })),
      state('enVotacion', style({ transform: 'translateX(-200%)' })),
      transition('enLectura => enParticipacion', [
        animate('300ms linear')
      ]),
      transition('enParticipacion => enLectura', [
        animate('300ms linear')
      ])
    ]),
    trigger('lecturaButton', [
      state('enLectura', style({ transform: 'translateX(0px)' })),
      state('enParticipacion', style({ transform: 'translateX(100%)' })),
      state('enVotacion', style({ transform: 'translateX(-100%)' })),
      transition('enLectura => enParticipacion', [
        animate('300ms linear')
      ]),
      transition('enParticipacion => enLectura', [
        animate('300ms linear')
      ]),
      transition('enLectura => enVotacion', [
        animate('300ms linear')
      ]),
      transition('enVotacion => enLectura', [
        animate('300ms linear')
      ])
    ]),
    trigger('votacionButton', [
      state('enLectura', style({ transform: 'translateX(100%)' })),
      state('enParticipacion', style({ transform: 'translateX(200%)' })),
      state('enVotacion', style({ transform: 'translateX(0px)' })),
      transition('enLectura <=> enVotacion', [
        animate('300ms linear')
      ])
    ]),
    trigger('votacion', [
      state('enLectura', style(
        {
          height: '0px',
          padding: '0px',
          borderBottom: '0px',
          transform: 'translateX(100%)',
          display: 'none'
        }
      )),
      state('enParticipacion', style(
        {
          height: '0px',
          padding: '0px',
          borderBottom: '0px',
          transform: 'translateX(100%)',
          display: 'none'
        }
      )),
      state('enVotacion', style(
        {
          height: '*',
          padding: '10px 15px',
          borderBottom: '1px solid rgba(0,0,0,.12)',
          transform: 'translateX(0px)',
          display: 'block'
        }
      )),
      transition('enLectura <=> enVotacion', [
        animate('300ms linear')
      ])
    ]),
    trigger('participacion', [
      state('enLectura', style(
        {
          height: '0px',
          padding: '0px',
          borderBottom: '0px',
          transform: 'translateX(-100%)',
          display: 'none'
        }
      )),
      state('enParticipacion', style(
        {
          height: '*',
          padding: '10px 15px',
          borderBottom: '1px solid rgba(0,0,0,.12)',
          transform: 'translateX(0px)',
          display: 'block'
        }
      )),
      state('enVotacion', style(
        {
          height: '0px',
          padding: '0px',
          borderBottom: '0px',
          transform: 'translateX(-100%)',
          display: 'none'
        }
      )),
      transition('enLectura <=> enParticipacion', [
        animate('300ms linear')
      ])
    ])
  ]
})
export class DebateEnCursoComponent implements OnInit, OnDestroy {

  debates: any = [];
  debatesSubscription: Subscription;

  estadoApp: string = 'enLectura';
  preguntaVotacion: string = '';

  horaEntonces: Date = null;
  tiempoRestante: number = null;
  debateId: string = null;

  intervalId = null;

  constructor(public dialog: MatDialog, db: DebatesService, private dba: AngularFireDatabase) {
    this.debatesSubscription = db.debatesEnCurso
      .map(deb => deb.map(d => ({
        titulo: d.titulo,
        estado: d.estado,
        agenda: d.agenda.split(';').map(a => a.trim()).filter(a => !!a),
        fecha: new Date(d.fecha),
        actividad: d.actividad,
        key: d.key,
        preguntas: d.preguntas 
      })))
      .subscribe(debates => {
        this.debates = debates;
        
        if (debates.length > 0) {
          this.estadoApp = debates[0].actividad;
          this.debateId = debates[0].key;
          /*if (this.estadoApp == 'enVotacion') {
            this.horaEntonces = new Date(debates[0].preguntas[debates[0].preguntas.length - 1].hora);
            this.intervalId = setInterval(() => {
              let horaAhora: Date = new Date();
              let transcurrido = horaAhora - this.horaEntonces;
              this.tiempoRestante = (300000 - transcurrido) / 1000;
              if (this.tiempoRestante > 0.1)
                this.tiempoRestante -= 0.1;
              else {
                clearInterval(this.intervalId);
              }
            }, 100);
          }*/
        }
      })
  }

  abrirParticipacion() {
    let dialogRef = this.dialog.open(DialogToConfirm, {
      data: { titulo: 'Pedir Participaciones' }
    });

    dialogRef.afterClosed().subscribe(accept => {
      if (accept) {
        this.estadoApp = 'enParticipacion';
      }
    });
  }

  finalizarParticipacion() {
    this.estadoApp = 'enLectura';
  }

  abrirVotos() {
    let dialogRef = this.dialog.open(DialogToConfirmWithAsk, {
      width: '300px',
    });

    dialogRef.afterClosed().filter(r => r.trim()).subscribe(pregunta => {
      if (pregunta) {
        this.preguntaVotacion = pregunta;
        this.estadoApp = 'enVotacion';
        this.dba.object(`/punicipio/debates/${this.debateId}`)
          .update({
            actividad: 'enVotacion'
          })
          .then(arg => {
            this.dba.list(`/punicipio/debates/${this.debateId}/preguntas`).push({
              pregunta: this.preguntaVotacion,
              hora: (new Date()).toISOString(),
              tiempoRestante: 300
            });
            this.tiempoRestante = 300;
            this.horaEntonces = new Date();
            this.intervalId = setInterval(() => {
              if (this.tiempoRestante > 0.1)
                this.tiempoRestante -= 0.1;
              else {
                clearInterval(this.intervalId);
              }
            }, 100);
          })
          .catch(err => {
            console.log('error');
            this.preguntaVotacion = '';
            this.estadoApp = 'enLectura';
          })
      }
    });
  }

  finalizarVotos() {
    this.estadoApp = 'enLectura';
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.debatesSubscription.unsubscribe();
  }

}

/*
* Componentes
* para los
* dialogos
*/

@Component({
  selector: 'dialog-to-confirm',
  template: `
  <div class="mat-typography">
    <h2 mat-dialog-title>{{data?.titulo}}</h2>
    <mat-dialog-content>¿Esta seguro?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close>No</button>
      <button mat-raised-button [mat-dialog-close]="true" color="primary">Si</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [
    `
      .mat-dialog-actions{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .mat-dialog-actions>button{
        box-sizing: border-box;
        width: 50%;
        margin: 0px;
      }
    `
  ]
})
export class DialogToConfirm {

  constructor(public dialogRef: MatDialogRef<DialogToConfirm>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-to-confirm-with-ask',
  template: `
  <div class="mat-typography">
    <h2 mat-dialog-title>Pedir Votos</h2>
    <mat-dialog-content>
      <mat-form-field class="example-full-width">
        <textarea matInput placeholder="Pregunta" #pregunta></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button [mat-dialog-close]="pregunta.value" color="primary">Crear</button>
    </mat-dialog-actions>
  </div>
  `,
  styles: [
    `
    .mat-typography{
      box-sizing: border-box;
    }  
    .mat-dialog-actions{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .mat-form-field{
      display: block;
    }
    .mat-dialog-actions>button{
      box-sizing: border-box;
      width: 50%;
      margin: 0px;
    }
    `
  ]
})
export class DialogToConfirmWithAsk {

  constructor(public dialogRef: MatDialogRef<DialogToConfirmWithAsk>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}