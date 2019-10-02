import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';


@Component({
  selector: 'app-lands-detail',
  templateUrl: './lands-detail.component.html',
  styleUrls: ['./lands-detail.component.css']
})
export class LandsDetailComponent implements OnInit {
  details: PropertyDetails[];
  imgbox: any[];
  imagenew: any[];
  zoom: number = 5;
  latitude: number = 13.7348534;;
  longitude: number = 100.4997134999999;
  lat: number;
  lng: number;
  public postID: string;
  public activePage: number;
  public results: any;
  isPlaying = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  contactUser: any[];
  IDcontact1: number
  IDcontact2: number
  IDcontact3: number
  lonnew: number;
  latnew: number;
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.onForeach()
    }, 3000);

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.onSetcontact()
      this.recenter()
    }, 5000);

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
    this.auth.getland().subscribe((land) => {
      this.details = land
      // กรณี resuponse success
      this.results = this.details.filter(article => {
        return article.ID_Lands == this.postID;

      });

    })
    //-------- get contact ----
    this.auth.getContact().subscribe((contactUser) => {
      this.contactUser = contactUser;
    },
      err => {
        console.error(err)
      }
    )
    this.auth.getimgland().subscribe((img) => {
      this.imgbox = img
      // กรณี resuponse success
      this.imagenew = this.imgbox.filter(article => {
        return article.ID_land == this.postID;

      });
      if (this.imagenew.length == 0) {
        this.galleryImages = [
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
        ]

      } else {
        this.galleryImages = this.imagenew.map(item => {

          return {
            small: 'http://www.landvist.xyz/images/' + item.URL,
            medium: 'http://www.landvist.xyz/images/' + item.URL,
            big: 'http://www.landvist.xyz/images/' + item.URL
          };

        });
      }

    })
  }

  recenter() {
    setTimeout(() => {

      this.latitude = Number(this.latnew)
      this.longitude = Number(this.lonnew)
      console.log(this.latnew)
      console.log(this.lonnew)
      this.zoom = 15

    }, 3000);
  }

  onForeach() {
    this.results.forEach((element, index) => {
      console.log(this.latitude)
      this.latnew = element.Latitude
      this.lonnew = element.Longitude
      this.lat = element.Latitude
      this.lng = element.Longitude
      this.IDcontact1 = element.ContactU
      this.IDcontact2 = element.ContactUt
      this.IDcontact3 = element.ContactUo
      console.log(this.latitude)
    });
  }
  onSetcontact() {
    console.log("555")
    this.selectContact = this.contactUser.filter(article => {
      return article.ID_Contact == this.IDcontact1;
    });
    this.selectContact2 = this.contactUser.filter(article => {
      return article.ID_Contact == this.IDcontact2;
    });
    this.selectContact3 = this.contactUser.filter(article => {
      return article.ID_Contact == this.IDcontact3;
    });
  }

}
