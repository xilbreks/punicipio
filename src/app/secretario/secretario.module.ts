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

import { SecretarioComponent } from './secretario.component';
import { DebatesComponent } from './debates/debates.component';
import { DebateComponent } from './debate/debate.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NuevoDebateComponent } from './nuevo-debate/nuevo-debate.component';
import { DebateEditComponent } from './debate-edit/debate-edit.component';
import { DebateEnCursoComponent } from './debate-en-curso/debate-en-curso.component';

const childRoutes: Routes = [
  {
    path: 'app',
    component: SecretarioComponent,
    children: [
      {
        path: 'debates',
        component: DebatesComponent
      },
      {
        path: 'nuevo',
        component: NuevoDebateComponent
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
      },
      {
        path: 'debate/:id/edit',
        component: DebateEditComponent
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
    SecretarioComponent,
    DebatesComponent,
    DebateComponent,
    UsuarioComponent,
    NuevoDebateComponent,
    DebateEditComponent,
    DebateEnCursoComponent
  ]
})
export class SecretarioModule { }
