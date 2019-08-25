import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
@Component({
  selector: 'app-lands-detail',
  templateUrl: './lands-detail.component.html',
  styleUrls: ['./lands-detail.component.css']
})
export class LandsDetailComponent implements OnInit {
  details: PropertyDetails[];
  public postID:number;
  public activePage:number;
  public results:any;
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
/*

    let params = this.route.snapshot.paramMap;
    if(params.has('id')){
      this.postID = +params.get('id');
    }
    this.route
    .queryParams
    .subscribe((data: { page: any }) => {
      if(data!=null && data.page!=null){
        this.activePage = +data.page;   
      }
    }); 
    this.auth.getland().subscribe((land) =>
    {
      this.details = land
      // กรณี resuponse success
        this.results = this.details.filter( article => {
          return article.ID_land == this.postID;
          
        });
        
    })*/

  }

}
