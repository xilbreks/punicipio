import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {

  }

  logIn(user, password): boolean {
    //console.log(user.value,password.value)
    if (user.value == '1')
      this.router.navigate(['/miembro/app/debates'])
    else if (user.value == '2')
      this.router.navigate(['/secretario/app/debates'])
    else if (user.value == '3')
      this.router.navigate(['/presidente/app/debates'])
    return false;
  }

  ngOnInit() {
  }

}
