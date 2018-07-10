import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { BackendService } from '../../services/backend.service';
import { Login } from '../../services/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: Login = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private backendService: BackendService) {}

  ngOnInit() {

  }

  login(){
    console.log('I am going to login')
    this.backendService.login(this.form).subscribe(
      data => {
        if(data.jwt){
          this.backendService.setLogged(data.jwt);
          this.router.navigate(['/main']);
        } else {
          // invalid credentials, write error
        }
      },
      err => console.error(err)
    );
  }

  register(){
    console.log('I am going to register')
    this.backendService.register(this.form).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err)
    );
  }

}
