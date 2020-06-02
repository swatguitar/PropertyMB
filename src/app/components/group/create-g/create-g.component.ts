import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails } from '../../../authentication.service';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/uploadimagegroup';
//const uri = 'http://localhost:3001/users/upload';

@Component({
  selector: 'app-create-g',
  templateUrl: './create-g.component.html',
  styleUrls: ['./create-g.component.css']
})
export class CreateGComponent implements OnInit {
  credentials: GroupDetails = {
    ID_Group: 0,
    ID_Item: 0,
    ID_Property: '',
    ID_member: 0,
    Email: '',
    ID_User: 0,
    ID_Folder: 0,
    NameG: '',
    NameF: '',
    Img: '',
    Created: ''
  }
  public postID: number;
  localImageUrl = [];
  Email: string
  CreateGroup: boolean = false
  Groups: any[];
  uploader: FileUploader = new FileUploader({ url: uri });
  folder: any;
  groupAll: any;
  GroupMs: any;
  temp: any;
  GDetails: any;
  renew: boolean = true;
  constructor(private http: HttpClient, private route: ActivatedRoute, public sanitizer: DomSanitizer, public auth: AuthenticationService,private router: Router ) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.renew = false
      let url = (window.URL) ? window.URL.createObjectURL(fileItem._file) : (window as any).webkitURL.createObjectURL(fileItem._file);
      this.localImageUrl.push(url)
      console.log(fileItem._file.size);
    }

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_Group', this.credentials.ID_Group);
    };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      if (response) {
        console.log("response" + JSON.stringify(response));
      }
    }
  }
  onRemoveFile(url) {
    this.renew = true
    this.localImageUrl.forEach((element, index) => {
      if (element == url) {
        this.localImageUrl.splice(index, 1);
        this.uploader.queue.splice(index, 1);
      }
    });
  }

  ngOnInit() {
    this.GDetails = []
    //************* get id *************
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = +params.get('id');
    }
    this.credentials.ID_Group = this.postID
    this.getGroupDetailMember()
    this.getGroup()
  }
  
  //************* get group by owner id *************
  getGroup() {
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
    },
      err => {
        console.error(err)

      }
    )
  }

  //************* get folder of group  *************
  getGroupFolder() {
    this.auth.getgroupfolder(this.credentials).subscribe((group) => {
      this.folder = group
      console.log(this.folder)
    },
      err => {
        console.error(err)
      })
  }
  
//************* get group that you are member  *************
  getGroupMember() {
    this.auth.getgroupM().subscribe((group) => {
      this.GroupMs = group;
    },
      err => {
        console.error(err)

      }
    )
  }

//************* get group that you are member  *************
  getGroupDetailMember() {
    this.auth.getGroupDetailMember().subscribe((group) => {
      this.GDetails = group;
      console.log(this.GDetails)
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
        this.router.navigateByUrl('/groups');
      },
      err => {
        console.error(err)
        alert(JSON.stringify(err.text))
      })
  }

  Chackmember() {

    this.auth.getMemberchack(this.credentials).subscribe(
      (r) => {
        alert(JSON.stringify(r))
      },
      err => {
        console.error(err)
        alert(JSON.stringify(err))
      })
  }

 

  onFinishedG() {
    setTimeout(() => {
      this.refresh()
    }, 2000);
  }
  createG() {
    this.CreateGroup = true
  }

 
  refresh(): void {
    window.location.reload();
  }
}  