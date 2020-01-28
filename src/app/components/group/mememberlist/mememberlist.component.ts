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
      this.onFinish()
      alert(JSON.stringify("อัพโหลดสำเร็จ"))

      this.refresh()
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
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = +params.get('id');
    }
    console.log(this.postID)
    this.credentials.ID_Group = this.postID
    this.auth.getgroupfolder(this.credentials).subscribe((group) => {
      this.folder = group
      console.log(this.credentials.ID_Group)

    },
      err => {
        console.error(err)
      })
    setTimeout(() => {
      this.auth.getgroupAll().subscribe((group) => {
        this.GroupsDetail = group.filter(article => {
          return article.ID_Group == this.postID

        });
        console.log(this.GroupsDetail)
     
      
 
      },
        err => {
          console.error(err)

        }
      )
    }, 1000);
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
    },
      err => {
        console.error(err)

      }
    )
    this.auth.getgroupM().subscribe((group) => {
      this.GroupMs = group;
    },
      err => {
        console.error(err)

      }
    )
    this.auth.getMember(this.credentials).subscribe((member) => {
      this.listMs = member;

    },
      err => {
        console.error(err)

      }
    )
    setTimeout(() => {
      this.auth.getgroupAll().subscribe((group) => {
        this.groupAll = group
        for (var i = 0; i < this.GroupMs.length; i++) {

          this.temp = group.filter(article => {

            return article.ID_Group == this.GroupMs[i].ID_Group
          });
          this.GDetails = this.GDetails.concat(this.temp);
          //this.GDetails.push([this.temp ]);
        }
      },
        err => {
          console.error(err)

        }
      )
    }, 1000);
    setTimeout(() => {

    
      this.auth.getMemberlist().subscribe((member) => {
        this.MemberList = member
        for (var i = 0; i < this.listMs.length; i++) {

          this.temp2 = member.filter(article => {

            return article.ID_User == this.listMs[i].ID_User
          });
          this.Lists = this.Lists.concat(this.temp2);
        }

      },
        err => {
          console.error(err)

        }
      )
    }, 1000);
    setTimeout(() => {
      this.GroupsDetail.forEach((element, index) => {
        this.ID_Owner = element.Owner
    }); 
      this.showSpinner = false
      this.auth.getgroupfolder(this.credentials).subscribe((folder) => {
        this.GFolders = folder;
      },
        err => {
          console.error(err)

        }
      )
    }, 2000);
    setTimeout(() => {
      this.Owner = this.MemberList.filter(article => {
        return article.ID_User == this.ID_Owner
        });
        console.log(this.Owner)
    }, 3000);

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
  CreateFolder() {
    this.auth.CreateF(this.credentials).subscribe(
      () => {
        this.refresh()
      },
      err => {
        console.error(err)

      }

    )

  }
  onDeleteGroup() {
    this.auth.Deletegroup(this.credentials).subscribe(
      () => {
        this.refresh()
      },
      err => {
        console.error(err)
        alert(JSON.stringify('กลุ่มถูกลบแล้ว'))
        this.router.navigateByUrl('/groups');
      }

    )
  }
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
      }

    )
  }
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


      }

    )
  }
  Findmember() {
    this.auth.getMemberchack(this.credentials).subscribe(
      (r) => {
        if (r == 'อีเมลนี้ไม่มีอยู่จริง') {
          alert(JSON.stringify(r))
          if (this.Member.length != 0) {
            this.Member.forEach((element, index) => {
              this.Member.splice(index, 1);
            });
          }
        } else {
          this.Member = r
        }

      },
      err => {
        console.error(err)
        alert(JSON.stringify(err))
      }
    )
  }
  onGroupname(name) {
    this.credentials.NameG = name
    console.log(this.GroupsDetail.NameG)
  }
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

      )
    }


  }
}  