import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { } from 'googlemaps';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails, PropertyDetails, GroupDetails, ImageID } from '../../../../authentication.service';
const uri = 'https://propermbbackend.appspot.com/users/uploadimagegroup';
//const uri = 'http://localhost:3001/users/upload';
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
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer, public auth: AuthenticationService ,private mapsAPILoader: MapsAPILoader, ) {
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
    this.galleryOptions = [
      { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ]
    this.GDetails = []
    this.Lists = []
    this.imagenew = []
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
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.onForeach()
    }, 3000);
    setTimeout(() => {    //<<<---    using ()=> syntax
      this.recenter()
    }, 5000);

    this.credentials.ID_Property = this.postID
    this.credentials.ID_Group = this.postgroup
    this.credentials.ID_Folder = this.postfolder
    this.imageID.ID_Property = this.postID
    this.imageID.ID_Lands = this.postID
    this.auth.getgroupfolder(this.credentials).subscribe((group) => {
      this.folder = group
    },
      err => {
        console.error(err)
      })

    this.auth.getimgland(this.imageID).subscribe((img) => {
      this.imageL = img
      // กรณี resuponse success
     
    })
    this.auth.getimghouse(this.imageID).subscribe((img) => {
      this.imageH = img
   
    })

    setTimeout(() => {
      this.imagenew = this.imageL.concat(this.imageH)
      if (this.imagenew.length == 0) {
        this.galleryImages = [
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
          {
            small: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            medium: 'http://www.landvist.xyz/images/Defult/placeholder.jpg',
            big: 'http://www.landvist.xyz/images/Defult/placeholder.jpg'
          },
        ]

      } else {
        this.galleryImages = this.imagenew.map(item => {

          return {
            small: 'http://www.landvist.xyz/images/' + item.URL,
            medium: 'http://www.landvist.xyz/images/' + item.URL,
            big: 'http://www.landvist.xyz/images/' + item.URL
          };

        });
      }
      this.auth.getgroupAll().subscribe((group) => {
        this.GroupsDetail = group.filter(article => {
          return article.ID_Group == this.postgroup

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
    this.auth.getMemberlist().subscribe((member) => {
      this.Userlist = member;
    },
      err => {
        console.error(err)

      }
    )








    this.auth.getallhouse().subscribe((Prop) => {
      this.Prop = Prop.filter(article => {

        return article.ID_Property == this.credentials.ID_Property
      });

    },
      err => {
        console.error(err)

      }
    )








    setTimeout(() => {
      if (this.Prop == '') {
        this.Getland()
      }else{
        this.GETOwner()
      }
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
        this.GFolders = folder.filter(article => {
          return article.ID_Folder == this.credentials.ID_Folder
        });
        console.log(this.GFolders)
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
  GETOwner(){
    setTimeout(() => {
      for (var i = 0; i < this.Userlist.length; i++) {
        this.Prop.forEach((element, index) => {
          if (element.Owner == this.Userlist[i].ID_User) {
            element.Costestimate = this.Userlist[i].Firstname +' '+ this.Userlist[i].Lastname+' | อีเมล '+ this.Userlist[i].Email
          }

        });
      }
    }, 2000);
  }
  GETOwnerL(){
    setTimeout(() => {
      for (var i = 0; i < this.Userlist.length; i++) {
        this.Prop.forEach((element, index) => {
          if (element.Owner == this.Userlist[i].ID_User) {
            element.Place = this.Userlist[i].Firstname +' '+ this.Userlist[i].Lastname+' | อีเมล '+ this.Userlist[i].Email
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