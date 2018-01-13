import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';

@Component({
  selector: 'app-nuevo-debate',
  templateUrl: './nuevo-debate.component.html',
  styleUrls: ['./nuevo-debate.component.css']
})
export class NuevoDebateComponent implements OnInit {

  debateForm: FormGroup;

  constructor(private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {
    this.debateForm = fb.group({
      'titulo': [''],
      'agenda': [''],
      'fecha': [new Date()]
    });
  }

  onSubmit(value: any): void {
    this.debateForm.disable()
    this.db.list('/punicipio/debates')
      .push({
        titulo: value.titulo,
        agenda: value.agenda,
        estado: 'pendiente',
        fecha: value.fecha.toISOString()
      })
    this.router.navigate(['../debates'],{relativeTo: this.route})
  }

  ngOnInit() {
  }

}
