import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService, UserDetails } from '../../authentication.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  details: UserDetails []
  constructor(public auth: AuthenticationService) {}

  OnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
    
  }
}
