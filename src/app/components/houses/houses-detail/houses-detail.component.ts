import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { count } from 'rxjs/operators';
import { GroupdetailComponent } from '../../group/grouplist/groupdetail/groupdetail.component';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.css']
})
export class HousesDetailComponent implements OnInit {
  details: PropertyDetails[];
  imgbox: any[];
  imagenew: any[];
  public postID: string;
  public activePage: number;
  public results: PropertyDetails[];
  zoom: number;
  lat: number;
  lng: number;
  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  a: any
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
      

    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]





    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.route
      .queryParams
      .subscribe((data: { page: any }) => {
        if (data != null && data.page != null) {
          this.activePage = +data.page;
        }
      });
    this.auth.getallhouse().subscribe((house) => {
      this.details = house
      // กรณี resuponse success
      this.results = this.details.filter(article => {
        return article.ID_Property == this.postID;
      });
     
    })
   
    
    this.zoom = 15;
    this.auth.getimghouse().subscribe((img) => {
      this.imgbox = img
      // กรณี resuponse success
      this.imagenew = this.imgbox.filter(article => {
        return article.ID_property == this.postID;

      });
      if(this.imagenew.length == 0){
        this.galleryImages = [
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' 
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' 
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' 
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' 
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' ,
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg' 
          },
        ]

      }else{
        this.galleryImages = this.imagenew.map(item => {
        
          return {
            small: 'http://www.landvist.xyz/images/' + item.URL,
            medium: 'http://www.landvist.xyz/images/' + item.URL,
            big: 'http://www.landvist.xyz/images/' + item.URL
          };
  
        });
      }
    
    })
      this.results.forEach((element, index) => {
        this.lat = element.Latitude
        this.lng = element.Latitude
        
      });
  }
  
}
