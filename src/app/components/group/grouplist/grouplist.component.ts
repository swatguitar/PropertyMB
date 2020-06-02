import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails } from '../../../authentication.service';
//const uri = 'http://localhost:3001/users/uploadimagegroup';
const uri = 'https://backendppmb.herokuapp.com/users/uploadimagegroup';//HUROKU

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
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
  showSpinner2: boolean = false;
  IMG: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer, public auth: AuthenticationService, ) {
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
      this.showSpinner2 = true
      setTimeout(() => {
        this.showSpinner2 = false
        alert(JSON.stringify("อัพโหลดสำเร็จ"))
      }, 15000);

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

 //************* Delete group *************
  onDeleteGroup() {
    this.auth.Deletegroup(this.credentials).subscribe(
      (result) => {
        alert(JSON.stringify(result))
        this.router.navigateByUrl('/groups');
      },
      err => {
        console.error(err)
      })
  }

   //************* Delete Member *************
  Deletemember(ID) {
    this.credentials.ID_User = ID
    this.auth.DeletegroupM(this.credentials).subscribe(
      (result) => {
        alert(JSON.stringify(result))
        this.refresh()
      },
      err => {
        console.error(err)
       
      })
  }
  //************* add Member *************
  Addmember() {
    this.auth.getMemberAdd(this.credentials).subscribe(
      (r) => {
        alert(JSON.stringify(r))
        if (r == 'เพิ่มสมาชิกสำเร็จ') {
          this.refresh()
        }
      },
      err => {
        console.error(err)
      })
  }

  //************* Find Member *************
  Findmember() {
    this.auth.getMemberchack(this.credentials).subscribe(
      (result) => {
        console.log(result)
        if (result == 'ไม่พบผู้ใช้งาน') {
          alert(JSON.stringify(result))
          if (this.Member.length != 0) {
            this.Member.forEach((element, index) => {
              this.Member.splice(index, 1);
            });
          }
        } else {
          this.Member = result
          console.log("aAASDASAS")
        }
      },
      err => {
        console.error(err)
        alert(JSON.stringify(err))
      })
  }
  //************* get group name *************
  onGroupname(name) {
    this.credentials.NameG = name
    console.log(this.GroupsDetail.NameG)
  }
  
  //************* edit group name *************
  Editname() {
    if (this.credentials.NameG == '') {
      alert(JSON.stringify('กรุณากรอกชื่อกลุ่ม'))
    } else {
      this.auth.UpdategroupN(this.credentials).subscribe(
        () => {
        },
        err => {
          console.error(err)
          alert(JSON.stringify('บันทึกสำเร็จ'))
          this.refresh()
        }
      )}
  }

  refresh(): void {
    window.location.reload();
  }
  reload() {
    this.showSpinner = true
    setTimeout(() => {
      this.showSpinner = false
    }, 2000);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
}  