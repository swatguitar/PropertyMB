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
  Profileimage: string = 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/img_Profile_not.png';

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
       
        this.Profileimage = user.ProfileImg
        if(this.Profileimage == null || this.Profileimage == '' ){
          if(user.Gender=='ชาย'){
            this.Profileimage = 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/img_Profile_men.png'
          }else if(user.Gender=='หญิง'){
            this.Profileimage = 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/img_Profile_women.png'
          }else{
            this.Profileimage = 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/img_Profile_not.png'
          }
        }
      },
      err => {
        console.error(err)
      }
    )
    setTimeout(() => {
      this.totalItem = this.totalLand+this.totalHouse
    }, 1000);
  }
  
}
