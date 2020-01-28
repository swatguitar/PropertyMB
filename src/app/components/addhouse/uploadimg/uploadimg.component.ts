import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/upload';
//const uri = 'http://localhost:3001/users/upload';
//const uri = 'https://polar-fjord-21366.herokuapp.com/users/upload';
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
