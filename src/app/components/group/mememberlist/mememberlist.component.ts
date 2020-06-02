import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails } from '../../../authentication.service';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/uploadimagegroup';
//const uri = 'http://localhost:3001/users/upload';

@Component({
  selector: 'app-mememberlist',
  templateUrl: './mememberlist.component.html',
  styleUrls: ['./mememberlist.component.css']
})
export class MememberlistComponent implements OnInit {
  credentials: GroupDetails = {
    ID_Group: 0,
    ID_Item: 0,
    ID_Property: '',
    ID_member: 0,
    ID_User: 0,
    ID_Folder: 0,
    NameG: '',
    NameF: '',
    Email: '',
    Img: '',
    Created: ''
  }
  public postID: number;
  localImageUrl = [];
  CreateGroup: boolean = false
  Groups: any[];
  GroupsDetail: any;
  uploader: FileUploader = new FileUploader({ url: uri });
  folder: any;
  showSpinner: boolean = true;
  GroupMs: any[];
  GDetails: any[];
  temp: any[];
  groupAll: any[]
  GFolders: any;
  renew: boolean = true;
  listMs: any;
  temp2: any;
  Lists: any;
  Member: any[];
  ID_user: string = (this.auth.getUserDetails().ID_User).toString()
  Owner: any;
  ID_Owner: any;
  MemberList: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer, public auth: AuthenticationService, ) {
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
    this.Lists = []
    //************* get id *************
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = +params.get('id');
    }
    this.credentials.ID_Group = this.postID
    this.getGroupDetailMember()
    this.getGroup()
    this.getGroupById()
    this.getGroupMember()
    this.credentials.ID_Group = this.postID
    setTimeout(() => {
     
      this.showSpinner = false
    }, 2000);

  }
  //************* get group by owner id *************
  getGroup() {
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
      this.credentials.ID_User = group[0].Owner
      console.log(this.credentials.ID_User)
      this.getOwnerInfo()
    },
      err => {
        console.error(err)

      }
    )
  }

   //************* get group by owner id *************
   getOwnerInfo() {
    this.auth.getGroupOwnerInfo(this.credentials).subscribe((Owner) => {
      this.Owner = Owner;
      console.log(this.Owner)
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

  //************* get group that you are member  *************
  getGroupById() {
    this.auth.getGroupById(this.credentials).subscribe((group) => {
      this.GroupsDetail = group;
      this.getGroupFolder()
    },
      err => {
        console.error(err)
      })
  }

  //************* get folder of group  *************
  getGroupFolder() {
    this.auth.getgroupfolder(this.credentials).subscribe((group) => {
      if(group){
        this.folder = group
        console.log(this.folder)
      }
    },
      err => {
        console.error(err)
      })
  }

  //************* get detail member of group  *************
  getGroupMember() {
    this.auth.getMemberlist(this.credentials).subscribe((member) => {
      this.Lists = member
    
        console.log(this.Lists)
  },
    err => {
      console.error(err)
    })
  }

  //************* Create folder  *************
  CreateFolder() {
    this.auth.CreateF(this.credentials).subscribe(
      () => {
        this.refresh()
      },
      err => {
        console.error(err)
      })
  }

//************* out group *************
  getOutgroup() {
    this.credentials.ID_User = parseInt(this.ID_user)

    this.auth.DeletegroupM(this.credentials).subscribe(
      () => {
        this.refresh()
      },
      err => {
        console.error(err)
        alert(JSON.stringify('ออกจากกลุ่มแล้ว'))
        this.router.navigateByUrl('/groups');
      })
  }

  reload() {
    this.showSpinner = true
    setTimeout(() => {

    }, 100);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  refresh(): void {
    window.location.reload();
  }
  
}  