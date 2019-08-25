import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../authentication.service'

@Component({
  selector: 'app-lands',
  templateUrl: './lands.component.html',
  styleUrls: ['./lands.component.css']
})
export class LandsComponent  {

    details: PropertyDetails[];

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    
    this.auth.getland().subscribe((land) =>
    {
      this.details = land;
    })
  }
}

