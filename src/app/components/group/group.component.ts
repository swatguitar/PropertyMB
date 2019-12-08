import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails,GroupDetails } from '../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
const uri = 'https://propermbbackend.appspot.com/users/uploadprofile';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  credentials:GroupDetails ={
    ID_Group: 0,
    ID_Item: 0,
    ID_Property: '',
    ID_member: 0,
    ID_User: 0,
    ID_Folder: 0,
    NameG: '',
    Email: '',
    NameF: '',
    Img: '',
    Created: ''
  }
  localImageUrl = [];
  CreateGroup: boolean = false
  Groups: any[];
  uploader: FileUploader = new FileUploader({ url: uri  });
  constructor(public auth: AuthenticationService, private router: Router,private http: HttpClient, public sanitizer: DomSanitizer,) { 
  
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (item) => {
      let url = (window.URL) ? window.URL.createObjectURL(item._file) : (window as any).webkitURL.createObjectURL(item._file);
      this.localImageUrl.push(url)
      console.log(item._file.size);
    }
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_Group' , this.credentials.ID_Group);
     };
    this.uploader.onAfterAddingFile = () => {
     // this.uploader.uploadAll();
    }
    
    
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
     // this.onFinish()
      //alert(JSON.stringify("อัพโหลดสำเร็จ"))
    
   if(response){
    console.log("response"+JSON.stringify(response));
  }
 }
 
  }
 
  ngOnInit() {
    
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
    },
      err => {
        console.error(err)

      }
    )
  }

  onCreateG() {

    this.auth.addgroup(this.credentials).subscribe(
      (r) => {
        console.log(r)
      },
      err => {
        console.error(err)
        alert(JSON.stringify(err.text))

      }

    )

  }
  onFinishedG() {
setTimeout(() => {
  this.refresh()
}, 2000);
  }
  createG() {
    this.CreateGroup = true
  }
  onFinish() {
    this.auth.uploadftp().subscribe(() => {
     
    },
      err => {
        console.error(err)
      }
    )

  }

  refresh(): void {
    window.location.reload();
}

}
