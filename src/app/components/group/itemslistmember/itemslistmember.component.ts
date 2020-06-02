import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails } from '../../../authentication.service';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/uploadimagegroup';
//const uri = 'http://localhost:3001/users/upload';

@Component({
  selector: 'app-itemslistmember',
  templateUrl: './itemslistmember.component.html',
  styleUrls: ['./itemslistmember.component.css']
})
export class ItemslistmemberComponent implements OnInit {
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
  list: any;
  showSpinner: boolean = true;
  GroupMs: any[];
  GDetails: any[];
  temp: any[];
  keyword = 'AnnounceTH';
  groupAll: any[]
  GFolders: any;
  groupD: any;
  temp2: any[];
  Property: any[];
  details: any;
  detailsL: any;
  detailsH: any;
  Land: any[];
  temp3: any;
  createItem: any[];
  ID_user: string = (this.auth.getUserDetails().ID_User).toString()
  temp4: any;
  Userlist: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer, public auth: AuthenticationService, ) { }

  
  ngOnInit() {
    this.GDetails = []
    this.Property = []
    this.details = []
    this.detailsH = []
    this.detailsL = []
    this.Land = []

    //************* get id *************
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = +params.get('id');
    }
    this.credentials.ID_Folder = this.postID
    this.getGroupID()
    this.getProperty()
    this.getLandInFolder()
    this.getPropertyInFolder()


    setTimeout(() => {

      this.GFolders.forEach((element, index) => {
        this.credentials.ID_Group = element.ID_Group
      });
    }, 1000);

    setTimeout(() => {
      this.showSpinner = false
    }, 2000);

  }
  //************* get property to find for add into group *************
  getProperty() {
    //************* House  *************
    this.auth.gethouse().subscribe((house) => {
      this.detailsH = house
    },
      err => {
        console.error(err)
      })
    //************* Land  *************
    this.auth.getland().subscribe((land) => {
      this.detailsL = land

    },
      err => {
        console.error(err)
      })
      setTimeout(() => {
        this.details = this.detailsH.concat(this.detailsL);
        this.details.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      }, 2000);
  }
  //************* get group that you are member  *************
  getGroupById() {
    this.auth.getGroupById(this.credentials).subscribe((group) => {
      this.GroupsDetail = group;
    },
      err => {
        console.error(err)
      })
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


  //************* get detail member of group  *************
  getGroupMember() {
    this.auth.getMemberlist(this.credentials).subscribe((member) => {
      this.Userlist = member
    },
      err => {
        console.error(err)
      })
  }

  //************* get group ID  *************
  getGroupID() {
    this.auth.getgroupfolderID(this.credentials).subscribe((folder) => {
      this.GFolders = folder;
      console.log("ssssssss"+folder)
      console.log("sss"+this.GFolders)
      this.credentials.ID_Group = folder[0].ID_Group
      this.getGroupDetailMember()
      this.getGroup()
      this.getGroupById()
      this.getGroupMember()
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

  //************* get property in folder *************
  getPropertyInFolder() {
    this.auth.getPeropertyInFolder(this.credentials).subscribe((result) => {
      this.Property = result
    },
      err => {
        console.error(err)
      })
  }

  //************* get Land in folder *************
  getLandInFolder() {
    this.auth.getLandInFolder(this.credentials).subscribe((result) => {
      this.Land = result
      console.log(this.Land)
    },
      err => {
        console.error(err)
      })
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
  CreateList() {

    if (this.credentials.ID_Property != "") {
      this.auth.CreateList(this.credentials).subscribe(
        (error) => {
          console.log(error.error);
          if (!error.error) {
            alert(JSON.stringify("เพิ่มอสังหาฯลงกลุ่มสำเร็จ"))
            this.refresh()
          } else if (error.error) {
            alert(JSON.stringify("มีอสังหานี้ในกลุ่มแล้ว"))
          }

        },
        err => {
          console.error(err)
          alert(JSON.stringify(err))
        }

      )
    }


  }
  onFocused() {

  }
  onSelectProperty(value) {
    if (!value.ColorType) {
      this.credentials.ID_Property = value.ID_Property
    } else {
      this.credentials.ID_Property = value.ID_Lands
    }
    console.log(this.credentials.ID_Property)
  }
  onDelete() {

    this.auth.DeletegroupF(this.credentials).subscribe(
      () => {

      },
      err => {
        console.error(err)
        alert(JSON.stringify('แฟ้มถูกลบแล้ว'))
        this.router.navigate(['/groups/groupfolder', this.credentials.ID_Group]);
      }
    )
  }
  onDeleteItem(value) {
    this.credentials.ID_Property = value
    this.auth.DeletegroupP(this.credentials).subscribe(
      () => {

      },
      err => {
        console.error(err)
        alert(JSON.stringify('ลบอสังหาฯออกจจากกลุ่มแล้ว'))
        this.refresh()
      }
    )
  }
  onFoldername(name) {
    this.credentials.NameF = name
  }
  Editname() {
    if (this.credentials.NameF == '') {
      alert(JSON.stringify('กรุณากรอกชื่อแฟ้ม'))
    } else {
      this.auth.UpdatefolderN(this.credentials).subscribe(
        () => {

        },
        err => {
          console.error(err)
          alert(JSON.stringify('บันทึกสำเร็จ'))
          this.refresh()
        }

      )
    }


  }

}  