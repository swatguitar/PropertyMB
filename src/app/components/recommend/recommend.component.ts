import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload } from '../../authentication.service';
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  constructor(private auth: AuthenticationService,) { }
  public details: any[];
  public results:any[];
  ngOnInit() {
    this.auth.gethouse().subscribe((house) => {
      this.details = house;
    },
      err => {
        console.error(err)
      }
    )
  }

  onClick(){

  }
}
