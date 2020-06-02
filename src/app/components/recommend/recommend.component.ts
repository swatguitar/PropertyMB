import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails, GroupDetails, UserType } from '../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  details: PropertyDetails[];
  public highlightId: number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  // filter ประเภทบ้าน
  filter = {
    yellow: false, orange: false, brown: false, red: false, purple: false, plum: false, green: false, whitegreen: false, brownweak: false, blue: false,
    priceA: false, priceB: false, priceC: false, priceD: false, priceE: false, priceF: false, priceG: false, priceH: false, priceI: false, priceJ: false, priceK: false, priceL: false,
    typecodeA: false, typecodeB: false, typecodeC: false, typecodeD: false, typecodeE: false, LocationA: false, LocationB: false, LocationC: false
  };
  properties: PropertyDetails[] = []; // สร้าง array เปล่ารอรับค่าจาก checkbox
  filterProperty: PropertyDetails[];
  searchTerm: string;
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า variable
  public iPage: number[] = [];
  public iPageStart: number = 1;
  public prevPage: number;
  public nextPage: number;
  public activePage: number;
  public totalItem: number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage: number = 9; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage: number;
  public maxShowPage: number;
  public useShowPage: number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart: number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd: number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

  address: string;
  province: locationsDetails[];
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  amphur: any[];
  PA: locationsDetails;
  district: locationsDetails;
  zipcode: any[];
  createID: string
  years: any[];
  TypeREC: string;
  searchDis: string;
  searchDis1: any[];
  searchAmphur: string;
  searchAmphur1: any[];
  searchPro: string = "";
  searchPro1: string = "";
  propertiesclone: any[];
  A: any[];
  pricemin: number
  pricemax: number
  newprice: number
  newMprice: number
  newCprice: number
  totalItemR: number;
  totalItemL: any;
  ClickButton: boolean = false;
  B: [];
  D: [];
  C: [];
  ALL: any;
  AllProperty: any[];
  GDetails: any[];
  groupAll: any[];
  Groups: any;
  GroupMs: any;
  temp: any;
  folder: any;
  LandShortTerm: any;
  LandLongTerm: any;
  totalItemLL: any;
  totalItemLS: any;
  HouseLongTerm: any;
  HouseShortTerm: any;
  totalItemHS: any;
  totalItemHL: any;
  AllShortTrem: PropertyDetails[];
  AllLongTrem: PropertyDetails[];
  totalItemAS: number = 0;
  totalItemAL: number = 0;
  showSpinner: boolean;
  selectfilter1: any = ""
  selectfilter2: any = ""
  selectfilter3: any = ""
  selectGroupAdd: string = ""
  credentials: UserType = {
    ID_Property: '',
    ID_Lands: '',
    ID_Photo: '',
    UserType: '',
    LProvince: '',
    PriceMax: null,
    PriceMin: null
  }
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
  FirstTime: boolean = true;
  PropertType: any = '';
  showItemH: boolean = false;
  showItemL: boolean = false;
  UserType: string = ""
  ShowUserType: boolean = false;
  FilterPrice: string = ""
  Select1: boolean = false;
  Select2: boolean = false;
  Select4: boolean = false;
  Select3: boolean = false;
  PropertyType: any;
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
  changePage(page: number) {
    this.activePage = page;
    this.router.navigate(['/recommend'], { queryParams: { page: page } });
  }

  pagination() {
    if (this.activePage > this.useShowPage) {
      if (this.activePage + 2 <= this.totalPage) {
        this.iPageStart = this.activePage - 2;
        this.maxShowPage = this.activePage + 2;
      } else {
        if (this.activePage <= this.totalPage) {
          this.iPageStart = (this.totalPage + 1) - this.useShowPage;
          this.maxShowPage = (this.iPageStart - 1) + this.useShowPage;
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
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า

  ngOnInit() {
    this.GDetails = []
    this.groupAll = []
    this.filterProperty = []
    this.activePage = 1;
    this.nextPage = 2;
    this.pointEnd = this.perPage * this.activePage;
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
    this.getGroup()
    this.getLocation()
  }
  selectPropertyType(value) {
    this.Select2 = true
    this.PropertyType = value
  }
  selectSellPrice(value) {

    if (value == "P1") {
      this.credentials.PriceMax = 1000000
      this.credentials.PriceMin = 500000
    }
    if (value == "P2") {
      this.credentials.PriceMax = 5000000
      this.credentials.PriceMin = 1100000
    }
    if (value == "P3") {
      this.credentials.PriceMax = 1000000
      this.credentials.PriceMin = 5100000
    }
    if (value == "P4") {
      this.credentials.PriceMax = null
      this.credentials.PriceMin = 10000000
    }
  }
  //************* select province *************
  PROVINCE_NAME: string
  selectprovince(data) {
    this.credentials.LProvince = data.PROVINCE_NAME

  } selectType(value) {
    this.credentials.UserType = value
    this.Select1 = true
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

  APIRecommend() {
    this.FirstTime = false
    this.showSpinner = true
    this.showItemL = false
    this.showItemH = false
    this.totalItem = 0
    this.filterProperty.length = 0
    console.log("PropertyType :"+this.PropertyType)
    console.log(this.credentials)
    setTimeout(() => {
      if (this.PropertyType == '001') {
        this.auth.RecommendHouse(this.credentials).subscribe(result => {
          if (result) {
            this.filterProperty = result
            console.log(result)
            console.log("TTT" + this.filterProperty)
            this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
            this.totalItem = this.filterProperty.length
            this.showSpinner = false
            this.showItemL = false
            this.showItemH = true
            if (result[0].UserType = 'Short-Trem') {
              this.UserType = 'ระยะสั้น'
            } else {
              this.UserType = 'ระยะยาว'
            }
            this.ShowUserType = true
          }
        });
      } else {
        this.auth.RecommendLnad(this.credentials).subscribe(result => {
          if (result) {
            this.filterProperty = result;
            this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
            this.totalItem = this.filterProperty.length
            this.showSpinner = false
            this.showItemH = false
            this.showItemL = true
            if (result[0].UserType = 'Short-Trem') {
              this.UserType = 'ระยะสั้น'
            } else {
              this.UserType = 'ระยะยาว'
            }
            this.ShowUserType = true
          }
        });
      }
    }, 3000);
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
          console.log(this.groupAll)
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

  //************* reset Filter *************
  Reset() {
    this.selectfilter1 = ""
    this.selectfilter2 = ""
    this.selectfilter3 = ""
    this.searchPro1  = ""
    this.PropertyType = ''
    this.credentials.LProvince = ''
    this.credentials.PriceMax = null
    this.credentials.PriceMin = null
    this.FirstTime = true
    this.Select1 = false
    this.Select2 = false
    this.showItemL = false
    this.showItemH = false
    this.totalItem = 0
    this.filterProperty.length = 0
  }
}

