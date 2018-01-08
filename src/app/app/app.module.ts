import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { DebatesComponent } from './debates/debates.component';
import { DebateComponent } from './debate/debate.component';
import { DebateEnCursoComponent } from './debate-en-curso/debate-en-curso.component';
import { UsuarioComponent } from './usuario/usuario.component';

const childRoutes: Routes = [
  {
    path: 'miembro',
    component: AppComponent,
    children: [
      {
        path: 'debates',
        component: DebatesComponent
      },
      {
        path: 'debate/:id',
        component: DebateComponent
      },
      {
        path: 'debate-en-curso',
        component: DebateEnCursoComponent
      },
      {
        path: 'usuario',
        component: UsuarioComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'miembro/debates'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule
  ],
  declarations: [
    AppComponent, 
    DebatesComponent, 
    DebateComponent, 
    DebateEnCursoComponent, UsuarioComponent
  ]
})
export class AppModule { }
