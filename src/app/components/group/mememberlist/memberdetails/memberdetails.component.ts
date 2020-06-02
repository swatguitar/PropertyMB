import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { } from 'googlemaps';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails, ImageID } from '../../../../authentication.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {
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
  public postID: string;
  localImageUrl = [];
  CreateGroup: boolean = false
  Groups: any[];
  GroupsDetail: any;
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
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  Member: any[];
  ID_user: string = (this.auth.getUserDetails().ID_User).toString()
  Owner: any;
  imgbox: any[];
  imagenew: any[];
  zoom: number = 5;
  latitude: number = 13.7348534; imageH: any;
  imageL: any;
  Userlist: any;
  longitude: number = 100.4997134999999;
  lat: number;
  lng: number;
  ID_Owner: any;
  MemberList: any;
  Prop: any;
  postgroup: number;
  postfolder: number;
  imageID: ImageID = {
    ID_Lands: '',
    ID_Property: '',
    ID_Photo: '',
    URL: '',
  }
  latnew: any;
  lonnew: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer, public auth: AuthenticationService, private mapsAPILoader: MapsAPILoader, ) {

  }


  ngOnInit() {
    //************* set show image *************
    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]

    this.GDetails = []
    this.Lists = []
    this.imagenew = []
    this.imageH = []
    this.imageL = []
    //************* แบ่งหน้า &&  get id property *************
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    if (params.has('group')) {
      this.postgroup = +params.get('group');
    }
    if (params.has('folder')) {
      this.postfolder = +params.get('folder');
    }
    this.credentials.ID_Property = this.postID
    this.credentials.ID_Group = this.postgroup
    this.credentials.ID_Folder = this.postfolder
    this.imageID.ID_Property = this.postID
    this.imageID.ID_Lands = this.postID
    this.getGroupDetailMember()
    this.getGroupFolder()
    this.getGroup()
    this.getGroupID()
    this.getGroupById()
    this.getDataH()
    this.auth.getimgland(this.imageID).subscribe((img) => {
      this.imageL = img
    })
    this.auth.getimghouse(this.imageID).subscribe((img) => {
      this.imageH = img
    })
    this.getImage()

    setTimeout(() => {
      this.showSpinner = false
    }, 2000);
  }
  //************* get group by owner id *************
  getDataH() {
    this.auth.getMemberHDetail(this.credentials).subscribe((result) => {
      this.Prop = result;
      this.credentials.ID_User = result[0].Owner
      if(this.Prop.length != 0){
        this.getOwnerInfo()
      }else{
        this.getDataL()
      }
    },
      err => {
        console.error(err)

      }
    )
  }
  getDataL() {
    this.auth.getMemberLDetail(this.credentials).subscribe((result) => {
      this.Prop = result;
      this.credentials.ID_User = result[0].Owner
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
      if (group) {
        this.folder = group
        console.log(this.folder)
      }
    },
      err => {
        console.error(err)
      })
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
  //************* get image *************
  getImage() {
    this.imagenew = this.imageL.concat(this.imageH)
    if (this.imagenew.length == 0) {
      this.galleryImages = [
        {
          small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
        },
        {
          small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
        },
        {
          small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
        },
        {
          small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
        },
        {
          small: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          medium: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg',
          big: 'https://backendppmb.s3.us-east-2.amazonaws.com/Defult/placeholder.jpg'
        },
      ]
    } else {
      this.galleryImages = this.imagenew.map(item => {
        return {
          small: item.URL,
          medium: item.URL,
          big: item.URL
        };
      });
    }
  }
  //************* get group ID  *************
  getGroupID() {
    this.auth.getgroupfolderID(this.credentials).subscribe((folder) => {
      this.GFolders = folder;
      console.log("ssssssss" + folder)
      console.log("sss" + this.GFolders)
      this.credentials.ID_Group = folder[0].ID_Group
    },
      err => {
        console.error(err)

      }
    )
  }
  GETOwner() {
    setTimeout(() => {
      for (var i = 0; i < this.Userlist.length; i++) {
        this.Prop.forEach((element, index) => {
          if (element.Owner == this.Userlist[i].ID_User) {
            element.Costestimate = this.Userlist[i].Firstname + ' ' + this.Userlist[i].Lastname + ' | อีเมล ' + this.Userlist[i].Email
          }

        });
      }
    }, 2000);
  }
  GETOwnerL() {
    setTimeout(() => {
      for (var i = 0; i < this.Userlist.length; i++) {
        this.Prop.forEach((element, index) => {
          if (element.Owner == this.Userlist[i].ID_User) {
            element.Place = this.Userlist[i].Firstname + ' ' + this.Userlist[i].Lastname + ' | อีเมล ' + this.Userlist[i].Email
          }

        });
      }
    }, 2000);
  }

  recenter() {
    this.latitude = 13.7348534;
    this.longitude = 100.4997134999999;
    setTimeout(() => {

      this.latitude = Number(this.latnew)
      this.longitude = Number(this.lonnew)
      console.log(this.latnew)
      console.log(this.lonnew)
      this.zoom = 15

    }, 3000);
  }

  onForeach() {
    this.Prop.forEach((element, index) => {
      console.log(this.latitude)
      this.latnew = element.Latitude
      this.lonnew = element.Longitude
      this.lat = element.Latitude
      this.lng = element.Longitude
      console.log(this.latitude)
    });
  }











  Getland() {
    this.auth.getAllland().subscribe((Prop) => {
      this.Prop = Prop.filter(article => {

        return article.ID_Lands == this.credentials.ID_Property
      });

    },
      err => {
        console.error(err)
      })
    this.GETOwnerL()
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