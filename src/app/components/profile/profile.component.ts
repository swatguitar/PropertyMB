import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../authentication.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  details: UserDetails
  properties: any;
  totalItem: any;
  propertiesclone: any;
  totalLand: any;
  totalHouse: any;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.gethouse().subscribe(house => {
      this.properties = house;
      this.totalHouse = house.length
    });
    this.auth.getland().subscribe((land) => {

      this.totalLand= land.length;
      this.propertiesclone = land;
      
    });
    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.totalItem = this.totalLand+this.totalHouse
      },
      err => {
        console.error(err)
      }
    )
  }
  
  onFinish() {
    this.auth.uploadftp().subscribe(() => {
    },
      err => {
        console.error(err)
      }
    )

  }

  
}
