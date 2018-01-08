import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  url:string;
  subscription: Subscription;

  constructor(private router: Router){
    this.subscription = this.router.events.
    filter(e => e instanceof NavigationEnd).
    subscribe((e: RouterEvent)=>{
      console.log(e)
      this.url = e.url?e.url.split('/')[3]:'';
    })
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
