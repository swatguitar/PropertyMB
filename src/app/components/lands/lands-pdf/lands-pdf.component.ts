import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, ID, UserDetails, PropertyDetails, ImageID } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-lands-pdf',
  templateUrl: './lands-pdf.component.html',
  styleUrls: ['./lands-pdf.component.css']
})
export class LandsPDFComponent implements OnInit {
  filename: any;


  htmltoPDF() {
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#parentdiv")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

    });

  }



  UserProfile: any[];
  NameU: string
  details: PropertyDetails;
  imgbox: any[];
  imagenew: any[];
  public postID: string;
  public activePage: number;
  results: PropertyDetails[];
  zoom: number = 5;
  latitude: number = 13.7348534;;
  longitude: number = 100.4997134999999;
  lat: number;
  lng: number;
  conS1: string;
  conS2: string;
  conS3: string;
  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  a: any
  imgMap: HTMLImageElement;
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  contactUser: any[];
  IDcontact1: string
  IDcontact2: string
  IDcontact3: string
  lonnew: number;
  latnew: number;
  SelectID: ID = {
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
  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router) { }



  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.onForeach()
    }, 5000);
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.onSetcontact()
      this.recenter() 
    }, 7000);

    this.SelectID.ID_Lands = this.postID;
    this.imageID.ID_Lands = this.postID;
    this.auth.landUpdate(this.SelectID).subscribe((house) => {
      this.results = house
      this.details = house
      this.filename = house.AnnouceTH
      console.log(this.filename)
    },
      err => {
        console.error(err)
      })

    this.auth.profile().subscribe(
      user => {
        this.UserProfile = user

      },
      err => {
        console.error(err)
      }
    )
    //-------- get contact ----
    this.auth.getContact().subscribe((contactUser) => {
      this.contactUser = contactUser;
    },
      err => {
        console.error(err)
      }
    )





    this.auth.getimgland(this.imageID).subscribe((img) => {
      this.imgbox = img
      // กรณี resuponse success

      this.imagenew = this.imgbox.filter(article => {
        return article.ID_Lands == this.postID;

      });
      console.log(this.imagenew)
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
    this.latitude = 13.7348534;
    this.longitude = 100.4997134999999;
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
    this.Export() 
  }
  onSetcontact() {
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
  
  Export() {
    var map, mapOptions;
    mapOptions = {
      center: new google.maps.LatLng(this.lat,this.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //URL of Google Static Maps.
    var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap";

    //Set the Google Map Center.
    staticMapUrl += "?center=" + mapOptions.center.lat() + "," + mapOptions.center.lng();

    //Set the Google Map Size.
    staticMapUrl += "&size=700x350";

    //Set the Google Map Zoom.
    staticMapUrl += "&zoom=" + mapOptions.zoom;

    //Set the Google Map Type.
    staticMapUrl += "&maptype=" + mapOptions.mapTypeId;

    //Loop and add Markers.

    staticMapUrl += "&markers=color:red|"  + this.lat + "," + this.lng + "&key=AIzaSyCtHlvZUC6SiC7cWqS0xm4_PnS9Qc3gF3o";


    //Display the Image of Google Map.
    var imgMap = document.getElementById("imgMap");
    imgMap.setAttribute("src", staticMapUrl);
    imgMap.style.display = "block";
    console.log(imgMap)
  }

  downloadPDF() {

    var node = document.getElementById('parentdiv');

    var img;
    var filename;
    var newImage;


    domtoimage.toPng(node, { bgcolor: '#fff' })


      .then(function (dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function () {

          var pdfWidth = img.width;
          var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if (pdfWidth > pdfHeight) {
            doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
          }
          else {
            doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG', 10, 10, width, height);
          filename = 'PropertyMB_PDF' + '.pdf';
          doc.save(filename);

        };


      })
      .catch(function (error) {

        // Error Handling

      });

  }

}
