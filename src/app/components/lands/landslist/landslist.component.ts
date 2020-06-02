import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails, GroupDetails, FilterProperty,Location } from '../../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-landslist',
  templateUrl: './landslist.component.html',
  styleUrls: ['./landslist.component.css']
})
export class LandslistComponent implements OnInit {
  details: PropertyDetails[];
  public highlightId: number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  // filter ประเภทบ้าน
  filter = {
    yellow: false, orange: false, brown: false, red: false, purple: false, plum: false, green: false, whitegreen: false, brownweak: false, blue: false,
    priceA: false, priceB: false, priceC: false, priceD: false, priceE: false, priceF: false, priceG: false, priceH: false, priceI: false, priceJ: false, priceK: false, priceL: false,
    typecodeA: false, typecodeB: false, typecodeC: false, typecodeD: false, typecodeE: false, LocationA: false, LocationB: false, LocationC: false
  };
  properties: PropertyDetails[] = []; // สร้าง array เปล่ารอรับค่าจาก checkbox
  filterProperty: PropertyDetails[] = [];
  searchTerm: string;
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า variable
  public iPage: number[] = [];
  public iPageStart: number = 1;
  public prevPage: number;
  public nextPage: number;
  public activePage: number;
  public totalItem: number = 0; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage: number = 9; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage: number;
  public maxShowPage: number;
  public useShowPage: number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart: number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd: number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

  address: string;
  province: any;
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  amphur: any[];
  PA: locationsDetails;
  district: any;
  zipcode: any[];
  createID: string
  years: any[];
  searchDis: string;
  searchDis1: any[];
  searchAmphur: string;
  searchAmphur1: any[];

  propertiesclone: any[];
  pricemin: number
  pricemax: number
  newprice: number
  newMprice: number
  newCprice: number
  propertyType: string
  selectfilter1: any = ""
  selectfilter2: any = ""
  selectfilter3: any = ""
  searchPro1: string = ""
  selectGroupAdd: string = ""
  showSpinner: boolean = true;
  Homecondition: any;
  GDetails: any[];
  GroupMs: any;
  FilterPrice: string = ''
  Groups: any;
  groupAll: any;
  temp: any;
  groupdetail: GroupDetails = {
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
  filterLand: FilterProperty = {
    PropertyType: '',
    HomeCondition: '',
    Deed:'',
    PriceMax: null,
    PriceMin: null,
    LProvince: '',
    LAmphur: '',
    LDistrict: ''
  }
  Location: Location ={
    PROVINCE_ID: null,
    AMPHUR_ID: null,
    DISTRICT_ID: null,
    ZIPCODE_ID: null
  }
  folder: any;
  ColorType: string;
  Deed: string;
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  //************* แบ่งหน้า *************
  changePage(page: number) {
    this.activePage = page;
    this.router.navigate(["/lands"], { queryParams: { page: page } });
  }

  pagination() {
    if (this.activePage > this.useShowPage) {
      if (this.activePage + 2 <= this.totalPage) {
        this.iPageStart = this.activePage - 2;
        this.maxShowPage = this.activePage + 2;
      } else {
        if (this.activePage <= this.totalPage) {
          this.iPageStart = this.totalPage + 1 - this.useShowPage;
          this.maxShowPage = this.iPageStart - 1 + this.useShowPage;
        }
      }
      this.iPage = [];
      for (let i = this.iPageStart; i <= this.maxShowPage; i++) {
        this.iPage.push(i);
      }
    } else {
      this.iPageStart = 1;
      this.iPage = [];
      for (let i = this.iPageStart; i <= this.useShowPage; i++) {
        this.iPage.push(i);
      }
    }
  }

  ngOnInit() {
    this.GDetails = []
    this.groupAll = []
    this.activePage = 1;
    this.nextPage = 2;
    this.pointEnd = this.perPage * this.activePage;
    this.showSpinner = true

    this.totalPage = Math.ceil(this.totalItem / this.perPage);
    if (this.totalPage > this.useShowPage) {
      this.useShowPage = 5;
    } else {
      this.useShowPage = this.totalPage;
    }

    for (let i = this.iPageStart; i <= this.useShowPage; i++) {
      this.iPage.push(i);
    }

    this.route.queryParams.subscribe((data: { page: any }) => {
      if (data != null && data.page != null) {
        this.activePage = +data.page;
        this.prevPage = this.activePage - 1;
        this.nextPage = this.activePage + 1;
        this.pointStart = (this.activePage - 1) * this.perPage;
        this.pointEnd = this.perPage * this.activePage;
        this.pagination();
      }
    });

    // ส่วนของการรับค่า paramMap ที่ส่งกลับมาจากหน้า รายละเอียด
    let params = this.route.snapshot.paramMap;
    if (params.has("id")) {
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get("id");
    }

    this.getLand()
    this.getGroup()
    this.getLocation()
  }

  //************* get land  by user id *************
  getLand() {
    this.auth.getland().subscribe(land => {
      if (land) {
        this.filterProperty = land;
        this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
        this.totalItem = this.filterProperty.length
        this.showSpinner = false
      }
    });
  }

  //************* get group *************
  getGroup() {
    this.auth.getgroup().subscribe((group) => {
      if (group) {
        this.Groups = group;
      }
    },
      err => {
        console.error(err)
      }
    )
    this.auth.getgroupM().subscribe((groupM) => {
      if (groupM) {
        this.GroupMs = groupM;
        this.concatGroup()
      }
    },
      err => {
        console.error(err)
      }
    )
  }

  //************* concat own group and member group *************
  concatGroup() {
    this.auth.getgroupAll().subscribe((group) => {
      for (var i = 0; i < this.GroupMs.length; i++) {
        this.temp = group.filter(article => {
          return article.ID_Group == this.GroupMs[i].ID_Group
        });
        this.GDetails = this.GDetails.concat(this.temp);
        if (this.GDetails.length != 0) {
          this.groupAll = this.Groups.concat(this.GDetails);
        } else {
          this.concatGroup()
        }
      }
    },
      err => {
        console.error(err)

      }
    )
  }

  //************* Filter *************
  Filter() {
    this.showSpinner = true
    this.filterProperty.length = null

    this.auth.filterLand(this.filterLand).subscribe(land => {
      if (land) {
        this.filterProperty = land;
        this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
        this.totalItem = this.filterProperty.length
        this.showSpinner = false
      }
    },
      err => {
        console.error(err)
      }
    )
  }

    //************* get province *************
    getLocation() {
      this.auth.getProvine().subscribe((province) => {
        if (province) {
          this.province = province;
          this.province.sort((a, b) => a.PROVINCE_NAME.localeCompare(b.PROVINCE_NAME));
        }
      },
        err => {
          console.error(err)
        }
      )
    }
  
    //************* select group form UI *************
    selectGroup(value) {
      this.groupdetail.ID_Group = value
      this.auth.getgroupfolder(this.groupdetail).subscribe((group) => {
        this.folder = group
      },
        err => {
          console.error(err)
        })
    }
  
    //************* select folder of group form UI *************
    selectFolder(value) {
      this.groupdetail.ID_Folder = value
    }
  
    //************* select ID of property form UI *************
    SelectID(ID) {
      this.groupdetail.ID_Property = ID
    }
  
    //************* Add item to folder *************
    CreateList() {
      if (this.groupdetail.ID_Property != "" && this.groupdetail.ID_Folder != 0 && this.groupdetail.ID_Group != 0) {
        this.auth.CreateList(this.groupdetail).subscribe((result) => {
          console.log(result.error);
          if (!result.error) {
            alert(JSON.stringify(result))
            this.resetCriteria()
          } else if (result.error) {
            alert(JSON.stringify(result.error))
            this.resetCriteria()
          }
        },
          err => {
            console.error(err)
            alert(JSON.stringify(err))
          }
        )
      } else {
        alert(JSON.stringify("กรุณาเลือกกลุ่ม"))
      }
    }
  
  //************* reset criteria *************
  resetCriteria() {
    this.selectGroupAdd = ""
    this.groupdetail.ID_Property = ''
    this.groupdetail.ID_Folder = 0
    this.groupdetail.ID_Group = 0
  }

  //************* select province *************
  PROVINCE_NAME: string
  selectprovince(data) {
    this.filterLand.LProvince = data.PROVINCE_NAME
    this.Location.PROVINCE_ID = data.PROVINCE_ID
    this.auth.getAmphur(this.Location).subscribe((amphur) => {
      this.amphur = amphur
      this.amphur.sort((a, b) => a.AMPHUR_NAME.localeCompare(b.AMPHUR_NAME));
    },
      err => {
        console.error(err)
      })
  }
  selectamphur(data) {
    this.filterLand.LAmphur = data.AMPHUR_NAME
    this.Location.AMPHUR_ID = data.AMPHUR_ID
    this.auth.getDistrict(this.Location).subscribe((district) => {
      this.district = district
      this.district.sort((a, b) => a.DISTRICT_NAME.localeCompare(b.DISTRICT_NAME));
    },
      err => {
        console.error(err)
      })
  }
  selectdistrict(data) {
    this.filterLand.LDistrict = data.DISTRICT_NAME
    this.Location.DISTRICT_ID = data.DISTRICT_ID
    this.auth.getZipcode(this.Location).subscribe((zipcode) => {
      this.zipcode = zipcode
    },
      err => {
        console.error(err)
      })
  }
//************* select Filter *************
  selectPropertyType(type) {
    this.filterLand.PropertyType = type
  }
  selectSellPrice(value) {
    if (value == "P1") {
      this.filterLand.PriceMax = 1000000
      this.filterLand.PriceMin = 500000
    }
    if (value == "P2") {
      this.filterLand.PriceMax = 5000000
      this.filterLand.PriceMin = 1100000
    }
    if (value == "P3") {
      this.filterLand.PriceMax = 1000000
      this.filterLand.PriceMin = 5100000
    }
    if (value == "P4") {
      this.filterLand.PriceMax = null
      this.filterLand.PriceMin = 10000000
    }
  }
  selectDeed(value) {
    this.filterLand.Deed = value
  }

//************* reset Filter *************
  Reset() {
    this.selectfilter1 = ""
    this.selectfilter2 = ""
    this.selectfilter3 = ""
    this.filterLand.PropertyType = ''
    this.filterLand.HomeCondition = ''
    this.filterLand.LAmphur = ''
    this.filterLand.LDistrict = ''
    this.filterLand.LProvince = ''
    this.filterLand.PriceMax = null
    this.filterLand.PriceMin = null
    this.getLand()
  }
}
