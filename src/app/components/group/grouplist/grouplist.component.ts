import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload } from '../../../authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  details: PropertyDetails;
  public results:any;
  public Groups:any;
  public pointStart:number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd:number = 3; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.onClick();
    this.auth.gethouse().subscribe((house) =>
    {

      this.details = house;
    },
      err => {
        console.error(err)
      }
    )
    this.auth.getland().subscribe((land) =>
    {
      this.results = land;
    },
      err => {
        console.error(err)
      }
    )
    this.auth.getgroup().subscribe((group) =>
    {

      this.Groups = group;
    },
      err => {
        console.error(err)
      }
    )


  }

  onClick(){
    this.router.navigateByUrl('/groups:id')
  }
}
