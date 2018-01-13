import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'miembro',
    loadChildren: './../miembro/miembro.module#MiembroModule'
  },
  {
    path: 'secretario',
    loadChildren: './../secretario/secretario.module#SecretarioModule'
  },
  {
    path: 'presidente',
    loadChildren: './../presidente/presidente.module#PresidenteModule'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes,{useHash:true,enableTracing:false}),
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    LoginComponent,
    ShellComponent
  ],
  exports: [
    ShellComponent
  ]
})
export class CoreModule { }
