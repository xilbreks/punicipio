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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material';

import { PresidenteComponent } from './presidente.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { DebatesComponent } from './debates/debates.component';
import { DebateComponent } from './debate/debate.component';
import { DebateEnCursoComponent } from './debate-en-curso/debate-en-curso.component';

const childRoutes: Routes = [
  {
    path: 'app',
    component: PresidenteComponent,
    children: [
      {
        path: 'debates',
        component: DebatesComponent
      },
      {
        path: 'debate-en-curso',
        component: DebateEnCursoComponent
      },
      {
        path: 'usuario',
        component: UsuarioComponent
      },
      {
        path: 'debate/:id',
        component: DebateComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'app/debates'
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
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    PresidenteComponent, 
    UsuarioComponent, 
    DebatesComponent, 
    DebateComponent, DebateEnCursoComponent
  ]
})
export class PresidenteModule { }
