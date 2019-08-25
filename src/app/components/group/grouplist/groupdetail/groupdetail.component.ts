import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload } from '../../../../authentication.service';
@Component({
  selector: 'app-groupdetail',
  templateUrl: './groupdetail.component.html',
  styleUrls: ['./groupdetail.component.css']
})
export class GroupdetailComponent implements OnInit {
  itemData:PropertyDetails[];
  public postID:number;
  public activePage:number;
  public results:any;
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
   /* console.log(this.itemData)

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
    this.auth.getAllland().subscribe((land) =>
    {
      this.itemData = land
      // กรณี resuponse success
        this.results = this.itemData.filter( article => {
          return article.ID_group == this.postID;
          
        });
        
        console.log(this.results);
    })*/
  }

}
