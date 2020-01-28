import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/uploadimageLand';
//const uri = 'http://localhost:3001/users/uploadimageLand';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload } from '../../../authentication.service';

@Component({
  selector: 'app-uploadimgland',
  templateUrl: './uploadimgland.component.html',
  styleUrls: ['./uploadimgland.component.css']
})
export class UploadimglandComponent implements OnInit {
  localImageUrl = [];
  attachmentList: any = [];
  uploader: FileUploader = new FileUploader({ url: uri 
  });
  @Input() ID_Lands: string
 
  constructor(private http: HttpClient, public sanitizer: DomSanitizer,private auth: AuthenticationService,) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (fileItem) => {
      let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.localImageUrl.push(url)
      console.log(fileItem._file.size);
    }
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_lands' ,this.ID_Lands);
  
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
  onFinish() {
    this.auth.uploadftp().subscribe(() => {
    },
      err => {
        console.error(err)
      }
    )

  }
  ngOnInit() {
  }
  onSave(){


  }
}
