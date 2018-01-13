import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-debate-edit',
  templateUrl: './debate-edit.component.html',
  styleUrls: ['./debate-edit.component.css']
})
export class DebateEditComponent implements OnInit, OnDestroy {

  debateForm: FormGroup;
  debateSubscription: Subscription;

  constructor(private db: AngularFireDatabase, fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.debateForm = fb.group({
      'titulo': [''],
      'agenda': [''],
      'fecha': [null]
    })
    this.debateForm.disable()

    this.debateSubscription = db.object(`/punicipio/debates/${this.route.snapshot.params['id']}`).valueChanges()
      .subscribe((debate: any) => {
        this.debateForm.controls['titulo'].setValue(debate.titulo)
        this.debateForm.controls['agenda'].setValue(debate.agenda)
        this.debateForm.controls['fecha'].setValue(new Date(debate.fecha))
        this.debateForm.enable()
      });
  }

  onSubmit(value: any): void {
    this.debateForm.disable()
    this.db.object(`/punicipio/debates/${this.route.snapshot.params['id']}`)
      .update({
        titulo: value.titulo,
        agenda: value.agenda,
        fecha: value.fecha.toISOString()
      })
      .then(arg => {
        this.router.navigate(['../'],{relativeTo: this.route})
      })
      .catch(err => {
        console.log('error')
        this.debateForm.enable()
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.debateSubscription.unsubscribe();
  }

}
