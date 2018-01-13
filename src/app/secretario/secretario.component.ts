import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-secretario',
  templateUrl: './secretario.component.html',
  styleUrls: ['./secretario.component.css']
})
export class SecretarioComponent implements OnInit, OnDestroy {

  url: string;
  urlSubscription: Subscription;

  constructor(private router: Router) {
    this.urlSubscription = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: RouterEvent) => {
        console.log(e)
        this.url = e.url ? e.url.split('/')[3] : '';
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }

}
