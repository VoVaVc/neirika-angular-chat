import { Component } from '@angular/core';
import {Router} from "@angular/router";

// Services
import {BackendService} from './services/backend.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router, private backendService: BackendService) {
    // here we need to find JWT token, if there is so locate to chat,
    // otherwise go to login
    if(this.backendService.isLogged()){
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
