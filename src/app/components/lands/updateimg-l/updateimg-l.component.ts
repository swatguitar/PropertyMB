import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
//const uri = 'http://localhost:3001/users/uploadImageL';
const uri = 'https://backendppmb.herokuapp.com/users/uploadImageL';//HUROKU
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload, ImageID } from '../../../authentication.service';

@Component({
  selector: 'app-updateimg-l',
  templateUrl: './updateimg-l.component.html',
  styleUrls: ['./updateimg-l.component.css']
})
export class UpdateimgLComponent implements OnInit {
  imgbox: any[];
  details: PropertyDetails[];
  results: PropertyDetails[];
  imagenew: any[];
  public postID: string;
  localImageUrl = [];
  attachmentList: any = [];
  galleryImages: any[];
  uploader: FileUploader = new FileUploader({
    url: uri
  });
  ImageID: ImageID = {
    ID_Lands: '',
    ID_Property: '',
    ID_Photo: '',
    URL: '',
  }
  ID_Lands: string
  constructor(private http: HttpClient, private route: ActivatedRoute, public sanitizer: DomSanitizer, private auth: AuthenticationService, ) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (fileItem) => {
      let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.localImageUrl.push(url)
      console.log(fileItem._file.size);
    }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_lands', this.ImageID.ID_Lands);
    };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {

      if (response) {
        console.log("response" + JSON.stringify(response));
      }
    }
  }

  ngOnInit() {
    //************* แบ่งหน้า &&  get id property *************
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.ImageID.ID_Lands = this.postID
    this.getLand()
    this.getImage()
  }
  //************* get property *************
  getLand() {
    this.auth.GetLandDetail(this.ImageID).subscribe((result) => {
      if (result) {
        this.results = result
      }
    },
      err => {
        console.error(err)
      })
  }

  //************* get Image *************
  getImage() {
    this.auth.getimgland(this.ImageID).subscribe((img) => {
      if (img) {
        this.imgbox = img
        console.log(this.imgbox)
      }
    })
  }

  //************* remove Image local *************
  onRemoveFile(url) {
    this.localImageUrl.forEach((element, index) => {
      console.log(index)
      if (element == url) {
        console.log(index)
        this.localImageUrl.splice(index, 1);
        this.uploader.queue.splice(index, 1);
      }
    });
  }

  //************* remove Image database *************
  onRemoveimage(value) {
    this.ImageID.ID_Photo = value.ID_Photo
    this.imgbox.forEach((element, index) => {
      if (element.ID_Photo == value.ID_Photo) {
        this.imgbox.splice(index, 1);
      }
    });
  }
  DELETE() {
    if (this.ImageID.ID_Photo != '') {
      this.auth.DeleteImageL(this.ImageID).subscribe((result) => {
        console.log(result)
      },
        err => {
          console.error(err)
        }
      )
    }
  }
  refresh(): void {
    window.location.reload();
  }
}
