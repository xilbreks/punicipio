import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  waitingResponse: boolean;

  constructor(private router: Router, private auth: AngularFireAuth) {
    this.waitingResponse = false;
  }

  logIn(user, password): boolean {

    this.waitingResponse = true;

    this.auth.auth.signInWithEmailAndPassword(user.value, password.value)
      .catch((err) => {
        this.waitingResponse = false;
        //console.log(err)
        alert(err.message);
        user.value = '';
        password.value = '';
      })
      .then((u) => {
        this.waitingResponse = false;
        if (u.email == 'miembro_punicipio@gmail.com')
          this.router.navigate(['/miembro/app/debates'])
        else if (u.email == 'secretario_punicipio@gmail.com')
          this.router.navigate(['/secretario/app/debates'])
        else if (u.email == 'presidente_punicipio@gmail.com')
          this.router.navigate(['/presidente/app/debates'])
      })

    return false;
  }

  ngOnInit() {
    //this.auth.auth.signOut()
  }

}
