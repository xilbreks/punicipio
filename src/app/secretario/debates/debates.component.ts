import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { DebatesService } from './../debates.service';

@Component({
  selector: 'app-debates',
  templateUrl: './debates.component.html',
  styleUrls: ['./debates.component.css']
})
export class DebatesComponent implements OnInit {

  constructor(public ds: DebatesService) {
  }

  ngOnInit() {
  }

}
