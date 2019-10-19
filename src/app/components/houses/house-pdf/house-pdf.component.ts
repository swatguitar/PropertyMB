import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-house-pdf',
  templateUrl: './house-pdf.component.html',
  styleUrls: ['./house-pdf.component.css']
})
export class HousePdfComponent implements OnInit {

  htmltoPDF()
{
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#parentdiv")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

  });

}

  downloadPDF()
            {

              var node = document.getElementById('parentdiv');
              
              var img;
              var filename;
              var newImage;


              domtoimage.toPng(node, { bgcolor: '#fff' })
              

                .then(function(dataUrl) {

                  img = new Image();
                  img.src = dataUrl;
                  newImage = img.src;

                  img.onload = function(){

                  var pdfWidth = img.width;
                  var pdfHeight = img.height;

                    // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

                    var doc;

                    if(pdfWidth > pdfHeight)
                    {
                      doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
                    }
                    else
                    {
                      doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
                    }


                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();


                    doc.addImage(newImage, 'PNG',  10, 10, width, height);
                    filename = 'mypdf_' + '.pdf';
                    doc.save(filename);

                  };


                })
                .catch(function(error) {

                 // Error Handling

                });

            }
            

  details: PropertyDetails[];
  imgbox: any[];
  imagenew: any[];
  public postID: string;
  public activePage: number;
  public results: PropertyDetails[];
  zoom: number = 5;
  latitude: number = 13.7348534;;
  longitude: number = 100.4997134999999;
  lat: number;
  lng: number;
  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  a: any
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  contactUser: any[];
  IDcontact1: number
  IDcontact2: number
  IDcontact3: number
  lonnew: number;
  latnew: number;

  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router) { }


  ngOnInit() {

  

  
    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]

    this.auth.getallhouse().subscribe((house) => {
      this.details = house
      // กรณี resuponse success
      this.results = this.details.filter(article => {
        return article.ID_Property == this.postID;
      });

    },
      err => {
        console.error(err)
      })
 
    //-------- get contact ----
    this.auth.getContact().subscribe((contactUser) => {
      this.contactUser = contactUser;
    },
      err => {
        console.error(err)
      }
    )




    this.auth.getimghouse().subscribe((img) => {
      this.imgbox = img
      // กรณี resuponse success

      this.imagenew = this.imgbox.filter(article => {
        return article.ID_property == this.postID;

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

}
