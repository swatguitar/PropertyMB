import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
const uri = 'https://propermbbackend.appspot.com/users/upload';
//const uri = 'http://localhost:3001/users/upload';
//const uri = 'https://polar-fjord-21366.herokuapp.com/users/upload';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload,ImageID } from '../../../authentication.service';

@Component({
  selector: 'app-updateimg-h',
  templateUrl: './updateimg-h.component.html',
  styleUrls: ['./updateimg-h.component.css']
})
export class UpdateimgHComponent implements OnInit {
  imgbox: any[];
  details: PropertyDetails[];
  results: PropertyDetails[];
  imagenew: any[];
  public postID: string;
  localImageUrl = [];
  attachmentList: any = [];
  galleryImages: any[];
  uploader: FileUploader = new FileUploader({ url: uri 
  });
  credentials: ImageID = {
    ID_Lands: '',
    ID_Property: '',
    ID_Photo: '',
    URL: '',
  }
 ID_Property: string
  constructor(private http: HttpClient,private route: ActivatedRoute, public sanitizer: DomSanitizer,private auth: AuthenticationService,) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (fileItem) => {
      let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.localImageUrl.push(url)
      console.log(fileItem._file.size);
    }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_property' , this.ID_Property);
     };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      this.onFinish()
   if(response){
    console.log("response"+JSON.stringify(response));
  }
 }
  }

  onRemoveFile(url) {
    this.localImageUrl.forEach((element, index) => {
      if (element == url) {
        this.localImageUrl.splice(index, 1);
        this.uploader.queue.splice(index, 1);
      }
    });
  }
  onRemoveimage(value){
    console.log(value.ID_Photo);
    this.credentials.ID_Photo = value.ID_Photo
    this.imagenew.forEach((element, index) => {
      if (element.ID_Photo == value.ID_Photo) {
        this.imagenew.splice(index, 1);
      }
    });
    this.auth.DeleteImageH(this.credentials).subscribe(() => {

    },
      err => {
        console.error(err)
  
      }
    )
  }
  onFinish() {
    this.auth.uploadftp().subscribe(() => {
    },
      err => {
        console.error(err)
      }
    )

  }
  
  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.ID_Property = this.postID
    this.credentials.ID_Property = this.postID
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

    
    this.auth.getimghouse(this.credentials).subscribe((img) => {
      this.imgbox = img
      // กรณี resuponse success

      this.imagenew = this.imgbox.filter(article => {
        return article.ID_property == this.postID;

      });
     

    })
    console.log(this.localImageUrl)
  }
  onSave(){


  }

}
