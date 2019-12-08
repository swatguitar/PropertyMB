import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails, TokenPayload, GroupDetails } from "../../../authentication.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: "app-houseslist",
  templateUrl: "./houseslist.component.html",
  styleUrls: ["./houseslist.component.css"]
})
export class HouseslistComponent implements OnInit {
  public highlightId: number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  // filter ประเภทบ้าน


  filter = { houses: false, condo: false, property: false, newhouse: false, oldhouse: false, priceA: false, priceB: false, priceC: false, priceD: false, priceE: false, priceF: false, priceG: false, priceH: false, priceI: false, priceJ: false, priceK: false, priceL: false };
  properties: PropertyDetails[] = []; // สร้าง array เปล่ารอรับค่าจาก checkbox
  filterProperty: PropertyDetails[] = [];
  // filter ราคา

  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า variable
  public iPage: number[] = [];
  public iPageStart: number = 1;
  public prevPage: number;
  public nextPage: number;
  public activePage: number;
  public totalItem: number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage: number = 12; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage: number;
  public maxShowPage: number;
  public useShowPage: number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart: number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd: number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  // search filter
  searchTerm: string;
  filterPrice: string;
  searchPro: string;
  searchPro1: any[];
  searchAmphur: string;
  searchAmphur1: any[];
  searchDis: string;
  searchDis1: any[];
  pricemin: number
  pricemax: number
  newprice: number
  newMprice: number
  newCprice: number

  drop4: string = ""
  totalItemsearch: number;
  propertiesclone: any[];
  address: string;
  propertyType: string
  selectfilter1: boolean = false
  selectfilter2: boolean = false
  selectfilter3: boolean = false
  selectfilter4: boolean = false
  selectfilter5: boolean = false
  selectfilter6: boolean = false
  selectfilter7: boolean = false
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
  FilterPrice: string = ''
  showSpinner: boolean = true;
  Homecondition: any;
  GDetails: any[];
  GroupMs: any;
  Groups: any;
  groupAll: any;
  temp: any;
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
  folder: any;
  @Output() filtering = new EventEmitter();
  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }


  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
  changePage(page: number) {
    this.activePage = page;
    this.router.navigate(["/houses"], { queryParams: { page: page } });
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
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า

  ngOnInit() {
    // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
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
    // ส่วนจัดการเกี่ยวกับการแบ่งหน้า

    // ส่วนของการดึงข้อมูล
    this.auth.gethouse().subscribe(house => {
      this.properties = house;
      this.totalItem = this.properties.length

    });

    // ส่วนของการรับค่า paramMap ที่ส่งกลับมาจากหน้า รายละเอียด
    let params = this.route.snapshot.paramMap;
    if (params.has("id")) {
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get("id");
    }

    //------------getlocation-------
    this.auth.getProvine().subscribe((province) => {
      this.province = province;
      this.province.sort((a, b) => a.PROVINCE_NAME.localeCompare(b.PROVINCE_NAME));
    },
      err => {
        console.error(err)

      }
    )
    this.GDetails = []
    this.groupAll = []
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

    setTimeout(() => {
      this.auth.getgroupAll().subscribe((group) => {

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
      this.groupAll = this.Groups.concat(this.GDetails);
    }, 2000);
    this.spinnerload()
  }
  selectGroup(value) {
  
    this.credentials.ID_Group = value
    console.log(value)
    this.auth.getgroupfolder(this.credentials).subscribe((group) => {
      this.folder = group


    },
      err => {
        console.error(err)
      })

  }
  selectFolder(value) {

    this.credentials.ID_Folder = value
    console.log(value)
  }
  SelectID(ID) {

    this.credentials.ID_Property = ID
    console.log(this.credentials.ID_Property)
  }
  CreateList() {

    if (this.credentials.ID_Property != "") {
      console.log(this.credentials.ID_Property+"  &"+this.credentials.ID_Folder)
      this.auth.CreateList(this.credentials).subscribe(
        (error) => {
          console.log(error.error);
          if (!error.error) {
            alert(JSON.stringify("เพิ่มอสังหาฯลงกลุ่มสำเร็จ"))
            this.credentials.ID_Property = ''
            this.credentials.ID_Folder = 0
            this.credentials.ID_Group = 0
          } else if (error.error) {
            alert(JSON.stringify("มีอสังหานี้ในกลุ่มแล้ว"))
            this.credentials.ID_Property = ''
            this.credentials.ID_Folder = 0
            this.credentials.ID_Group = 0
          }

        },
        err => {
          console.error(err)
          alert(JSON.stringify(err))
        }

      )
    }


  }

  selectprovince(data) {
    this.selectfilter3 = true
    this.searchPro = data.PROVINCE_NAME
    this.auth.getAmphur().subscribe((amphur) => {
      // กรณี resuponse success
      this.amphur = amphur.filter(article => {
        return article.PROVINCE_ID == data.PROVINCE_ID;
      });
    },
      err => {
        console.error(err)
      }
    )
  }

  selectamphur(data) {
    this.selectfilter4 = true
    this.searchAmphur = data.AMPHUR_NAME
    this.auth.getDistrict().subscribe((district) => {
      // กรณี resuponse success
      this.district = district.filter(article => {
        return article.AMPHUR_ID == data.AMPHUR_ID;
      });
    },
      err => {
        console.error(err)
      }
    )
  }

  selectdistrict(data) {
    this.selectfilter5 = true
    this.searchDis = data.DISTRICT_NAME
    this.auth.getZipcode().subscribe((zipcode) => {
      // กรณี resuponse success
      this.zipcode = zipcode.filter(article => {
        return article.DISTRICT_ID == data.DISTRICT_ID;
      });

    },
      err => {
        console.error(err)
      }
    )

  }
  spinnerload() {
    this.showSpinner = true
    this.filterProperty.length = 0
    setTimeout(() => {
      this.showSpinner = false

      this.Search()

    }, 1000);

  }

  selectfilterOne(type) {
    this.selectfilter1 = true
    this.propertyType = type
  }
  selectfiltertwo(value) {
    this.selectfilter2 = true
    this.FilterPrice = value
  }
  selectfilterthree() {
    this.selectfilter3 = true
  }
  selectfiltersix(H) {
    this.selectfilter6 = true
    this.Homecondition = H
  }


  Search() {
    //-----------------------------------Defult--------------------------------
    if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.auth.gethouse().subscribe((house) => {

        this.totalItem = house.length;
        this.filterProperty = house;
        this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      })
    }
   else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    ///-------------1.2
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    ///-------------1.3
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else  if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    ///-------------1.4
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    ///-------------1.5
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      console.log("555")
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 500000 && this.newprice <= 1000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 1100000 && this.newprice <= 5000000))
      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 5100000 && this.newprice <= 10000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (this.newprice >= 10000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    ///-------------1.6
    else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType))

      });
      this.totalItem = this.filterProperty.length;
    }
    //----------1.2.6
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P1') {
      console.log("555")
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.HomeCondition == this.Homecondition) && (this.newprice >= 500000 && this.newprice <= 1000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.HomeCondition == this.Homecondition) && (this.newprice >= 1100000 && this.newprice <= 5000000))
      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.HomeCondition == this.Homecondition) &&  (this.newprice >= 5100000 && this.newprice <= 10000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.HomeCondition == this.Homecondition) && (this.newprice >= 10000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------2
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else  if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------2.2
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      console.log("555")
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;

    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------2.3
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------2.4
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------2.5
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else  if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000) )

      });
      this.totalItem = this.filterProperty.length;
    }
     //-----------2.1
     else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.PropertyType == this.propertyType) )

      });
      this.totalItem = this.filterProperty.length;
    }
    else  if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.PropertyType == this.propertyType) )

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.PropertyType == this.propertyType) )

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000)&& (x.PropertyType == this.propertyType) )

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------3
    else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
     //-----------1.3
     else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.HomeCondition === this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
     //-----------1.3.4.
    else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
     //-----------1.3.4.5
    else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.PropertyType == this.propertyType) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
    //-----------6
    else  if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.HomeCondition == this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    ///-------6.1
    else  if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.HomeCondition == this.Homecondition) && (x.PropertyType == this.propertyType) )

      });
      this.totalItem = this.filterProperty.length;
    }
    //------6.2
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P1') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.HomeCondition == this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P2') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.HomeCondition == this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P3') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.HomeCondition == this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P4') {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((this.newprice >= 10000000) && (x.HomeCondition == this.Homecondition))

      });
      this.totalItem = this.filterProperty.length;
    }
    //........6.3
    else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.HomeCondition == this.Homecondition) && (x.LProvince == this.searchPro)  )

      });
      this.totalItem = this.filterProperty.length;
    }
    //--------6.3.4
    else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.HomeCondition == this.Homecondition) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur)  )

      });
      this.totalItem = this.filterProperty.length;
    }
     //--------6.3.4.5
     else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.HomeCondition == this.Homecondition) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur)&& (x.LDistrict === this.searchDis)  )

      });
      this.totalItem = this.filterProperty.length;
    }

    console.log("1" + this.selectfilter1)
    console.log("2" + this.selectfilter2)
    console.log("3" + this.selectfilter3)
    console.log("4" + this.selectfilter4)
    console.log("5" + this.selectfilter5)
    console.log("6" + this.selectfilter6)
    console.log("A" + this.FilterPrice)

  }
  Reset() {
    this.selectfilter1 = false
    this.selectfilter2 = false
    this.selectfilter3 = false
    this.selectfilter4 = false
    this.selectfilter5 = false
    this.selectfilter6 = false
    this.searchPro = ''
    this.searchAmphur = ''
    this.searchDis = ''
    this.FilterPrice = ''
    this.propertyType = ''
    this.spinnerload()
  }
  filterChange() {
    this.filterProperty = this.properties.filter(
      x =>
        (x.PropertyType === this.propertyType && x.HomeCondition === this.drop4) ||
        (x.PropertyType === "คอนโด" && this.propertyType == "คอนโด") ||
        (x.PropertyType === "อาคารพาณิชย์" && this.propertyType == "อาคารพาณิชย์") ||
        (x.HomeCondition === "ใหม่" && this.drop4 == "ใหม่") ||
        (x.HomeCondition === "มือสอง" && this.drop4 == "มือสอง")
    );
    if ((this.filterProperty.length == 0 && this.propertyType == "บ้าน") || (this.filterProperty.length == 0 && this.propertyType == "คอนโด") || (this.filterProperty.length == 0 && this.propertyType == "อาคารพาณิชย์") ||
      (this.filterProperty.length == 0 && this.drop4 == "ใหม่") || (this.filterProperty.length == 0 && this.drop4 == "มือสอง")) {
      this.propertiesclone.length = 0
    } else if ((this.filterProperty.length == 0 && this.propertyType == " ") || (this.filterProperty.length == 0 && this.propertyType == " ") || (this.filterProperty.length == 0 && this.propertyType == "") ||
      (this.filterProperty.length == 0 && this.drop4 == " ") || (this.filterProperty.length == 0 && this.drop4 == " ")) {
      this.auth.gethouse().subscribe((house) => {

        this.totalItem = house.length;
        this.propertiesclone = house;
        this.propertiesclone.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      })
    }
    this.totalItem = this.filterProperty.length;
  }

  filterprice() {
    this.filterProperty = this.properties.filter(
      x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return (this.newprice >= 500000 && this.newprice <= 1000000 && this.filter.priceA) || (this.newprice >= 1100000 && this.newprice <= 5000000 && this.filter.priceB) || (this.newprice >= 5100000 && this.newprice <= 10000000 && this.filter.priceC) || (this.newprice >= 10000000 && this.filter.priceD)
          || (this.newCprice >= 500000 && this.newCprice <= 1000000 && this.filter.priceE) || (this.newCprice >= 1100000 && this.newCprice <= 5000000 && this.filter.priceF) || (this.newCprice >= 5100000 && this.newCprice <= 10000000 && this.filter.priceG) || (this.newCprice >= 10000000 && this.filter.priceH)
          || (this.newMprice >= 500000 && this.newMprice <= 1000000 && this.filter.priceI) || (this.newMprice >= 1100000 && this.newMprice <= 5000000 && this.filter.priceJ) || (this.newMprice >= 5100000 && this.newMprice <= 10000000 && this.filter.priceK) || (this.newMprice >= 10000000 && this.filter.priceL)
      });
    if ((this.filterProperty.length == 0 && this.filter.priceA) || (this.filterProperty.length == 0 && this.filter.priceB) || (this.filterProperty.length == 0 && this.filter.priceC) || (this.filterProperty.length == 0 && this.filter.priceD) || (this.filterProperty.length == 0 && this.filter.priceE) ||
      (this.filterProperty.length == 0 && this.filter.priceF) || (this.filterProperty.length == 0 && this.filter.priceG) || (this.filterProperty.length == 0 && this.filter.priceH) || (this.filterProperty.length == 0 && this.filter.priceI) || (this.filterProperty.length == 0 && this.filter.priceJ) || (this.filterProperty.length == 0 && this.filter.priceK) || (this.filterProperty.length == 0 && this.filter.priceL)) {
      this.propertiesclone.length = 0
    } else if ((this.filterProperty.length == 0 && this.filter.priceA == false) || (this.filterProperty.length == 0 && this.filter.priceB == false) || (this.filterProperty.length == 0 && this.filter.priceC == false) || (this.filterProperty.length == 0 && this.filter.priceD == false) || (this.filterProperty.length == 0 && this.filter.priceE == false) ||
      (this.filterProperty.length == 0 && this.filter.priceF == false) || (this.filterProperty.length == 0 && this.filter.priceG == false) || (this.filterProperty.length == 0 && this.filter.priceH == false) || (this.filterProperty.length == 0 && this.filter.priceI == false) || (this.filterProperty.length == 0 && this.filter.priceJ == false) || (this.filterProperty.length == 0 && this.filter.priceK == false) || (this.filterProperty.length == 0 && this.filter.priceL == false)) {
      this.auth.gethouse().subscribe((house) => {

        this.totalItem = house.length;
        this.propertiesclone = house;
        this.propertiesclone.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      })
      this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
    }

    this.totalItem = this.filterProperty.length;

  }
  filterMaxMin() {
    this.filterProperty = this.properties.filter(
      x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return (this.newprice >= this.pricemin && this.newprice <= this.pricemax)

      });
    if (this.filterProperty.length == 0) {
      this.propertiesclone.length = 0
    }

  }


}
