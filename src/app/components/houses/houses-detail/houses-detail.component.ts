import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.css']
})
export class HousesDetailComponent implements OnInit {
  details: PropertyDetails[];
  imgbox: any[];
  imgnew: any[];
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

  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
      ]

    this.galleryImages = [
      {
        small: '../../../assets/Property.jpg',
        medium: '../../../assets/Property.jpg',
        big: '../../../assets/Property.jpg'
      },
      {
        small: '../../../assets/Home.jpg',
        medium: '../../../assets/Home.jpg',
        big: '../../../assets/Home.jpg'
      },
      {
        small: '../../../assets/Land.jpg',
        medium: '../../../assets/Land.jpg',
        big: '../../../assets/Land.jpg'
      }
    ];
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
    this.auth.gethouse().subscribe((house) => {
      this.details = house
      // กรณี resuponse success
      this.results = this.details.filter(article => {
        return article.ID_Property == this.postID;

      });

    })
    this.auth.getimghouse().subscribe((img) => {
      this.imgbox = img
      // กรณี resuponse success
      this.imgnew = this.imgbox.filter(article => {
        return article.ID_property == this.postID;

      });
      console.log(this.imgnew)

    })

    this.lat = 18.787381340982765;
    this.lng = 98.98149834171136;
    this.zoom = 15;

  }

}