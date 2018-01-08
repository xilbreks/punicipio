import { Component, OnInit } from '@angular/core';

import { trigger, style, state, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-debate-en-curso',
  templateUrl: './debate-en-curso.component.html',
  styleUrls: ['./debate-en-curso.component.css'],
  animations: [
    trigger('altura', [
      state('abierto',style({ 'transform': 'translateY(0px)' })),
      state('cerrado',style({ 'transform': 'translateY(110px)' })),
      transition('abierto <=> cerrado', [
        animate('1000ms linear')
      ])
    ])
  ]
})
export class DebateEnCursoComponent implements OnInit {
  mostrarTomarPalabra: boolean;
  estadoTomarPalabra: 'abierto' | 'cerrado';
  tomarPalabra: boolean;

  mostrarVotar: boolean;
  estadoVotar: 'abierto' | 'cerrado';
  voto: 'Si' | 'No' | 'Naa';

  constructor() {
    this.mostrarTomarPalabra = false;
    this.estadoTomarPalabra = 'cerrado';

    this.mostrarVotar = !false;
    this.estadoVotar = 'cerrado';
  }

  toggle(): void {
    this.estadoTomarPalabra = this.estadoTomarPalabra=='abierto'?'cerrado':'abierto';
  }

  alert():boolean{
    confirm('Ud. esta eligiendo SI\n¿Confirmar seleccion?')
    return false;
  }

  ngOnInit() {
  }

}