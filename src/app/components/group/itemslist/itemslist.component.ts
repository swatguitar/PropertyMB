import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails } from '../../../authentication.service';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/uploadimagegroup';
//const uri = 'http://localhost:3001/users/upload';

@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.css']
})
export class ItemslistComponent implements OnInit {
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
    this.temp2 = []
    this.temp3 = []
    this.temp4 = []
    this.Land = []
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = +params.get('id');
    }
    this.credentials.ID_Folder = this.postID
    this.auth.getgrouplist(this.credentials).subscribe((group) => {
      this.list = group
    },
      err => {
        console.error(err)
      })
    this.auth.getgroupfolderID(this.credentials).subscribe((folder) => {
      this.GFolders = folder;

    },
      err => {
        console.error(err)

      }
    )
    this.auth.getgroup().subscribe((group) => {
      this.Groups = group;
      this.GroupsDetail = group.filter(article => {
        return article.ID_Group == this.postID

      });

    },
      err => {
        console.error(err)

      }
    )
    this.auth.gethouse().subscribe((house) => {
      this.detailsH = house

    },
      err => {
        console.error(err)
      }
    )
    this.auth.getland().subscribe((land) => {
      this.detailsL = land

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
    this.auth.getMemberlist().subscribe((member) => {
      this.Userlist = member;
    },
      err => {
        console.error(err)

      }
    )
    setTimeout(() => {
      this.details = this.detailsH.concat(this.detailsL);
      this.details.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      this.GFolders.forEach((element, index) => {
        this.credentials.ID_Group = element.ID_Group
      });

      this.auth.getgroupAll().subscribe((group) => {
        for (var i = 0; i < this.GroupMs.length; i++) {

          this.temp = group.filter(article => {

            return article.ID_Group == this.GroupMs[i].ID_Group
          });
          this.GDetails = this.GDetails.concat(this.temp);
          //this.GDetails.push([this.temp ]);
        }
        this.groupD = group.filter(article => {

          return article.ID_Group == this.credentials.ID_Group
        });
      },
        err => {
          console.error(err)

        }
      )

      this.auth.getallhouse().subscribe((Prop) => {
        for (var i = 0; i < this.list.length; i++) {

          this.temp2 = Prop.filter(article => {
            if (article.ID_Property == this.list[i].ID_Property) {
              this.temp2.forEach((element, index) => {
                element.Created = this.list[i].Created
              });
            }
            return article.ID_Property == this.list[i].ID_Property
          });
          this.Property = this.Property.concat(this.temp2);

        }
        // this.Property = this.Property.concat(this.createItem);

      },
        err => {
          console.error(err)

        }
      )
      this.auth.getAllland().subscribe((Prop) => {
        for (var i = 0; i < this.list.length; i++) {

          this.temp3 = Prop.filter(article => {
            if (article.ID_Lands == this.list[i].ID_Property) {
              this.temp3.forEach((element, index) => {
                element.Created = this.list[i].Created
              });
            }
            return article.ID_Lands == this.list[i].ID_Property
          });

          this.Land = this.Land.concat(this.temp3);
          // console.log(this.Land)
        }
      },
        err => {
          console.error(err)

        }
      )
    }, 1000);
    setTimeout(() => {
      for (var i = 0; i < this.Userlist.length; i++) {
        this.Property.forEach((element, index) => {
          if (element.Owner == this.Userlist[i].ID_User) {
            element.CostestimateB = this.Userlist[i].Firstname +' '+ this.Userlist[i].Lastname
          }

        });
      }
      for (var i = 0; i < this.Userlist.length; i++) {
        this.Land.forEach((element, index) => {
          if (element.Owner == this.Userlist[i].ID_User) {
            element.Place = this.Userlist[i].Firstname +' '+ this.Userlist[i].Lastname
          }

        });
      }


      //this.Property = this.Property.concat(this.temp4);


      //console.log(this.Property)
    }, 2500);
    setTimeout(() => {
      this.showSpinner = false

    }, 2000);

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