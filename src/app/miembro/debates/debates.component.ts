import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debates',
  templateUrl: './debates.component.html',
  styleUrls: ['./debates.component.css']
})
export class DebatesComponent implements OnInit {

  debatesFinalizados: any[] = [];
  debatesPendientes: any[] = [];
  debateEnCurso: any = null;

  constructor() {

    this.debatesPendientes = [
      {
        titulo: 'primer debate',
        agenda: [],
        estado: 'Pendiente'
      },
      {
        titulo: 'segundo debate',
        agenda: [],
        estado: 'Pendiente'
      },
      {
        titulo: 'tercer debate',
        agenda: [],
        estado: 'Pendiente'
      }
    ];

    this.debateEnCurso = 'jojojo';

    this.debatesFinalizados = [
      {
        titulo: 'primer debate',
        agenda: [],
        estado: 'Finalizado'
      },
      {
        titulo: 'segundo debate',
        agenda: [],
        estado: 'Finalizado'
      },
      {
        titulo: 'tercer debate',
        agenda: [],
        estado: 'Finalizado'
      }
    ];
  }

  ngOnInit() {
  }

}
