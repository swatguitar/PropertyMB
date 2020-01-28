import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService, ID,UserDetails, PropertyDetails ,ImageID} from '../../../authentication.service'
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
  IDcontact1: string
  IDcontact2: string
  IDcontact3: string
  conS1:string
  conS2:string
  conS3:string
  lonnew: number;
  latnew: number;
  credentials: ID = {
    ID_Lands: '',
    ID_Property: '',
    PPStatus: '',
  }
  imageID: ImageID = {
    ID_Lands: '',
    ID_Property: '',
    ID_Photo: '',
    URL: '',
  }
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
    this.imageID.ID_Lands = this.postID
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
    this.auth.getimgland(this.imageID).subscribe((img) => {
      this.imagenew = img
      // กรณี resuponse success
      console.log( this.imagenew)
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
      this.conS1 = element.ContactS
      this.conS2 = element.ContactSt
      this.conS3 = element.ContactSo
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

  onDelete(){
    this.credentials.ID_Lands = this.postID;
    this.auth.DeleteLands(this.credentials).subscribe(() => {
     
    },
      err => {
        console.error(err)
        alert(JSON.stringify("อสังหานี้ถูกลบแล้ว"))
        this.router.navigateByUrl('/home')
      }
    )
  }
  PPStatus(value) {
    this.credentials.PPStatus = value
  }
  UpdateStatus() {
    this.credentials.ID_Lands = this.postID;
    console.log(this.credentials.ID_Lands)
    this.auth.UpdateStatusL(this.credentials).subscribe(() => {

    },
      err => {
        console.error(err)
        this.refresh()

      }
    )

  
  }
  
  refresh(): void {
    window.location.reload();
}
}
