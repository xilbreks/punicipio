import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-debate',
  templateUrl: './nuevo-debate.component.html',
  styleUrls: ['./nuevo-debate.component.css']
})
export class NuevoDebateComponent implements OnInit {

  constructor() { }

  crear():boolean{
    console.log('seeeeee');
    return false;
  }

  ngOnInit() {
  }

}
