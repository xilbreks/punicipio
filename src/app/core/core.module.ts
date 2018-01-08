import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    path: 'app',
    loadChildren: './../app/app.module#AppModule'
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
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule
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
