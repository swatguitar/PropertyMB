import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.css']
})
export class HousesDetailComponent implements OnInit {
  details: PropertyDetails[];
  imgbox :any[];
  imgnew : any[];
  public postID: string;
  //comment
  public activePage: number;
  public results: PropertyDetails[];
  zoom: number;
  lat: number;
  lng: number;
  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;

  // gallery images
  images: GALLERY_IMAGE[] = [
    {
      url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260", 
      altText: 'woman-in-black-blazer-holding-blue-cup', 
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260", 
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
    },
  ];
  
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

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