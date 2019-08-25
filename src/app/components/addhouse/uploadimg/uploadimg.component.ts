import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
const uri = 'http://localhost:3001/users/upload';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload } from '../../../authentication.service';

@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.component.html',
  styleUrls: ['./uploadimg.component.css']

})
export class UploadimgComponent implements OnInit {
  localImageUrl = [];
  attachmentList: any = [];
  uploader: FileUploader = new FileUploader({ url: uri 
  });
  @Input() ID_Property: string
  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (fileItem) => {
      let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.localImageUrl.push(url)
    }
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_property' , this.ID_Property);
     };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
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
  ngOnInit() {
  }
  onSave(){


  }

}
