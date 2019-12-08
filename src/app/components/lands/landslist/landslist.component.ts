import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails, GroupDetails } from '../../../authentication.service'
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
  public totalItem: number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage: number = 9; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage: number;
  public maxShowPage: number;
  public useShowPage: number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart: number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd: number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

  address: string;
  province: locationsDetails;
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  amphur: any[];
  PA: locationsDetails;
  district: locationsDetails;
  zipcode: any[];
  createID: string
  years: any[];
  searchDis: string;
  searchDis1: any[];
  searchAmphur: string;
  searchAmphur1: any[];
  searchPro: string;
  searchPro1: any[];
  propertiesclone: any[];
  pricemin: number
  pricemax: number
  newprice: number
  newMprice: number
  newCprice: number
  propertyType: string
  selectfilter1: boolean = false
  selectfilter2: boolean = false
  selectfilter3: boolean = false
  selectfilter4: boolean = false
  selectfilter5: boolean = false
  selectfilter6: boolean = false
  showSpinner: boolean = true;
  Homecondition: any;
  GDetails: any[];
  GroupMs: any;
  FilterPrice: string = ''
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
  ColorType: string;
  Deed: string;
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router: Router) { }

  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
  changePage(page: number) {
    this.activePage = page;
    this.router.navigate(['/lands'], { queryParams: { page: page } });
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

    this.route
      .queryParams
      .subscribe((data: { page: any }) => {
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
    this.auth.getland().subscribe((land) => {

      this.totalItem = land.length;
      this.properties = land;
      this.propertiesclone = land;
    })
    // ส่วนของการรับค่า paramMap ที่ส่งกลับมาจากหน้า รายละเอียด
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('id');
    }

    //------------getlocation-------
    this.auth.getProvine().subscribe((province) => {
      this.province = province;
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
  selectFolder(value, ID) {
    this.credentials.ID_Property = ID
    this.credentials.ID_Folder = value
    console.log(this.credentials.ID_Property)
  }
  CreateList() {

    if (this.credentials.ID_Property != "") {
      this.auth.CreateList(this.credentials).subscribe(
        (error) => {
          console.log(error.error);
          if (!error.error) {
            alert(JSON.stringify("เพิ่มอสังหาฯลงกลุ่มสำเร็จ"))

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
    this.ColorType = type
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
    this.Deed = H
  }


  Search() {
      //-----------------------------------Defult--------------------------------
      if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
        this.auth.getland().subscribe((land) => {
  
          this.totalItem = land.length;
          this.filterProperty = land;
          this.filterProperty.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
        })
      }
     else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P1') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      ///-------------1.2
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P1') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == false && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      ///-------------1.3
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else  if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      ///-------------1.4
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P1') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 10000000) && (x.LProvince == this.searchPro))
  
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
          return ((x.ColorType === this.ColorType) && (this.newprice >= 500000 && this.newprice <= 1000000))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 1100000 && this.newprice <= 5000000))
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 5100000 && this.newprice <= 10000000))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (this.newprice >= 10000000))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      ///-------------1.6
      else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          console.log(x.ColorType)
          console.log(this.ColorType)
          return ((x.ColorType === this.ColorType))
        
  
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
          return ((x.ColorType === this.ColorType) && (x.Deed == this.Deed) && (this.newprice >= 500000 && this.newprice <= 1000000))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (x.Deed == this.Deed) && (this.newprice >= 1100000 && this.newprice <= 5000000))
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (x.Deed == this.Deed) &&  (this.newprice >= 5100000 && this.newprice <= 10000000))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.ColorType === this.ColorType) && (x.Deed == this.Deed) && (this.newprice >= 10000000))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      //-----------2
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P1') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else  if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 10000000) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
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
          return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.ColorType === this.ColorType) )
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else  if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.ColorType === this.ColorType) )
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.ColorType === this.ColorType) )
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == true && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 10000000)&& (x.ColorType === this.ColorType) )
  
        });
        this.totalItem = this.filterProperty.length;
      }
      //-----------3
      else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == true && this.selectfilter6 == true) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis) && (x.Deed === this.Deed))
  
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
        return ((x.ColorType === this.ColorType) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur) && (x.LDistrict === this.searchDis))

      });
      this.totalItem = this.filterProperty.length;
    }
     //-----------1.3.4.5
    else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == true && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.ColorType === this.ColorType) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur))

      });
      this.totalItem = this.filterProperty.length;
    }
    //----------1.3.0
    else if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == false) {
      this.filterProperty = this.properties.filter(x => {
        this.newprice = parseInt(x.SellPrice)
        this.newCprice = parseInt(x.CostestimateB)
        this.newMprice = parseInt(x.MarketPrice)
        return ((x.ColorType === this.ColorType) && (x.LProvince == this.searchPro))

      });
      this.totalItem = this.filterProperty.length;
    }
      //-----------6
      else  if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.Deed == this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      ///-------6.1
      else  if (this.selectfilter1 == true && this.selectfilter2 == false && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.Deed == this.Deed) && (x.ColorType === this.ColorType) )
  
        });
        this.totalItem = this.filterProperty.length;
      }
      //------6.2
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P1') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 500000 && this.newprice <= 1000000) && (x.Deed == this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P2') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 1100000 && this.newprice <= 5000000) && (x.Deed == this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P3') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 5100000 && this.newprice <= 10000000) && (x.Deed == this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true && this.FilterPrice == 'P4') {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((this.newprice >= 10000000) && (x.Deed == this.Deed))
  
        });
        this.totalItem = this.filterProperty.length;
      }
      //........6.3
      else if (this.selectfilter1 == false && this.selectfilter2 == true && this.selectfilter3 == false && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.Deed == this.Deed) && (x.LProvince == this.searchPro)  )
  
        });
        this.totalItem = this.filterProperty.length;
      }
      //--------6.3.4
      else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.Deed == this.Deed) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur)  )
  
        });
        this.totalItem = this.filterProperty.length;
      }
       //--------6.3.4.5
       else if (this.selectfilter1 == false && this.selectfilter2 == false && this.selectfilter3 == true && this.selectfilter4 == false && this.selectfilter5 == false && this.selectfilter6 == true) {
        this.filterProperty = this.properties.filter(x => {
          this.newprice = parseInt(x.SellPrice)
          this.newCprice = parseInt(x.CostestimateB)
          this.newMprice = parseInt(x.MarketPrice)
          return ((x.Deed == this.Deed) && (x.LProvince == this.searchPro) && (x.LAmphur === this.searchAmphur)&& (x.LDistrict === this.searchDis)  )
  
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
    this.ColorType = ''
    this.Deed = ''
    this.spinnerload()
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
  filterChange() {

    this.filterProperty = this.properties.filter(
      x =>
        (x.ColorType === "พื้นที่สีเหลือง - ที่ดินประเภทที่อยู่อาศัยหนาแน่นน้อย" && this.filter.yellow) ||
        (x.ColorType === "พื้นที่สีส้ม - ที่ดินประเภทที่อยู่อาศัยหนาแน่นปานกลาง" && this.filter.orange) ||
        (x.ColorType === "พื้นที่สีน้ำตาล - ที่ดินประเภทที่อยู่อาศัยหนาแน่นมาก" && this.filter.brown) ||
        (x.ColorType === "พื้นที่สีแดง - ที่ดินประเภทภาณิชยกรรม" && this.filter.red) ||
        (x.ColorType === "พื้นที่สีม่วง - ที่ดินประเภทอุตสาหกรรมและคลังสินค้า" && this.filter.purple) ||
        (x.ColorType === "พื้นที่สีเม็ดมะปราง - ที่ดินประเภทคลังสินค้า" && this.filter.plum) ||
        (x.ColorType === "พื้นที่สีเขียว - ที่ดินประเภทชนบทและเกษตรกรรม" && this.filter.green) ||
        (x.ColorType === "พื้นที่สีขาวมีกรอบและเส้นทะแยงสีเขียว - ที่ดินประเภทอนุรักษ์ชนบทและเกษตรกรรม" && this.filter.whitegreen) ||
        (x.ColorType === "พื้นที่สีน้ำตาลอ่อน - ที่ดินประเภทอนุรักษ์เพื่อส่งเสริมเอกลักษณ์ศิลปวัฒนธรรมไทย" && this.filter.brownweak) ||
        (x.ColorType === "พื้นที่สีน้ำเงิน - ที่ดินประเภทสถาบันราชการ สาธารณูปโภคและสาธารณูปการ" && this.filter.blue)
    );
    if ((this.filterProperty.length == 0 && this.filter.yellow) || (this.filterProperty.length == 0 && this.filter.orange) || (this.filterProperty.length == 0 && this.filter.brown) ||
      (this.filterProperty.length == 0 && this.filter.red) || (this.filterProperty.length == 0 && this.filter.purple) || (this.filterProperty.length == 0 && this.filter.plum)) {
      this.propertiesclone.length = 0
    } else if ((this.filterProperty.length == 0 && this.filter.yellow == false) || (this.filterProperty.length == 0 && this.filter.orange == false) || (this.filterProperty.length == 0 && this.filter.brown == false) ||
      (this.filterProperty.length == 0 && this.filter.red == false) || (this.filterProperty.length == 0 && this.filter.purple == false) || (this.filterProperty.length == 0 && this.filter.plum == false)) {
      this.auth.getland().subscribe((land) => {

        this.totalItem = land.length;
        this.propertiesclone = land;
      })
    }

  }
  filterChangetwo() {
    this.filterProperty = this.properties.filter(
      x =>
        (x.Deed === "น.ส.4จ." && this.filter.typecodeA) ||
        (x.Deed === "น.ส.3ก." && this.filter.typecodeB) ||
        (x.Deed === "น.ส.3" && this.filter.typecodeC) ||
        (x.Deed === "น.ส.2" && this.filter.typecodeD) ||
        (x.Deed === "ส.ค.1" && this.filter.typecodeE) ||
        (x.Mainroad === 1 && this.filter.LocationA) ||
        (x.Cenmarket === 1 && this.filter.LocationB) ||
        (x.Insoi === 1 && this.filter.LocationC)
    );
    if ((this.filterProperty.length == 0 && this.filter.typecodeA) || (this.filterProperty.length == 0 && this.filter.typecodeB) || (this.filterProperty.length == 0 && this.filter.typecodeC) ||
      (this.filterProperty.length == 0 && this.filter.typecodeD) || (this.filterProperty.length == 0 && this.filter.typecodeE) || (this.filterProperty.length == 0 && this.filter.LocationA) || (this.filterProperty.length == 0 && this.filter.LocationB) || (this.filterProperty.length == 0 && this.filter.LocationC)) {
      this.propertiesclone.length = 0
    } else if ((this.filterProperty.length == 0 && this.filter.typecodeA == false) || (this.filterProperty.length == 0 && this.filter.typecodeB == false) || (this.filterProperty.length == 0 && this.filter.typecodeC == false) ||
      (this.filterProperty.length == 0 && this.filter.typecodeD == false) || (this.filterProperty.length == 0 && this.filter.typecodeE == false) || (this.filterProperty.length == 0 && this.filter.LocationA == false) || (this.filterProperty.length == 0 && this.filter.LocationB == false) || (this.filterProperty.length == 0 && this.filter.LocationC == false)) {
      this.auth.getland().subscribe((land) => {

        this.totalItem = land.length;
        this.propertiesclone = land;
      })
    }
    this.totalItem = this.filterProperty.length;
  }

}
