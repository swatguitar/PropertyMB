import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails, GroupDetails } from '../../authentication.service'
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
  public pointEnd: number = 2; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

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
  A: any[];
  pricemin: number
  pricemax: number
  newprice: number
  newMprice: number
  newCprice: number
  totalItemR: number;
  totalItemL: any;
  B: [];
  D: [];
  C: [];
  ALL: any;
  AllProperty: any[];
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
  totalItemAS: number;
  totalItemAL: number;
  showSpinner: boolean;
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
    this.AllProperty = []
    this.AllLongTrem = []
    this.AllShortTrem = []
    this.activePage = 1;
    this.nextPage = 2;
    this.GDetails = []
    this.groupAll = []
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
    this.auth.gethouse().subscribe(house => {

      this.A = house
      this.HouseShortTerm = house.filter(article => {
        return article.UserType == 'Short-Term';
      });
      this.HouseLongTerm = house.filter(article => {
        return article.UserType == 'Long-Term';
      });
      this.totalItemHL = this.LandLongTerm.length;
      this.totalItemHS = this.LandShortTerm.length;
    });
    this.auth.getland().subscribe((land) => {
      this.LandShortTerm = land.filter(article => {
        return article.UserType == 'Short-Term';
      });
      this.LandLongTerm = land.filter(article => {
        return article.UserType == 'Long-Term';
      });
      this.totalItemLL = this.LandLongTerm.length;
      this.totalItemLS = this.LandShortTerm.length;

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
    setTimeout(() => {
      this.B = this.A[Math.floor(Math.random() * this.A.length)];
      this.C = this.A[Math.floor(Math.random() * this.A.length)];
      this.D = this.A[Math.floor(Math.random() * this.A.length)];
      console.log(this.B)
    }, 2000);



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
      this.showSpinner = false
      this.AllShortTrem = this.HouseShortTerm.concat(this.LandShortTerm);
      this.AllLongTrem = this.HouseLongTerm.concat(this.LandLongTerm);
      this.totalItemAS = this.AllShortTrem.length
      this.totalItemAL = this.AllLongTrem.length
      this.AllShortTrem.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      this.AllLongTrem.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      console.log(this.AllShortTrem)
      console.log(this.AllLongTrem)
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
    // this.spinnerload()
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
      console.log(this.credentials.ID_Property + "  &" + this.credentials.ID_Folder)
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
  API() {
    this.showSpinner = true
    this.AllShortTrem.length = 0
    this.AllLongTrem.length = 0
    this.totalItemAS = this.AllShortTrem.length
    this.totalItemAL = this.AllLongTrem.length
    setTimeout(() => {
      this.showSpinner = false
      this.AllShortTrem = this.HouseShortTerm.concat(this.LandShortTerm);
      this.AllLongTrem = this.HouseLongTerm.concat(this.LandLongTerm);
      this.totalItemAS = this.AllShortTrem.length
      this.totalItemAL = this.AllLongTrem.length
      this.AllShortTrem.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      this.AllLongTrem.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());

      alert(JSON.stringify("ตอนนี้ยังไม่เสร็จ"))
    }, 5000);

  }
  Recommend() {
    this.B = this.A[Math.floor(Math.random() * this.A.length)];
    this.C = this.A[Math.floor(Math.random() * this.A.length)];
    this.D = this.A[Math.floor(Math.random() * this.A.length)];

  }

  selectamphur(data) {
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
  filterprice() {
    this.filterProperty = this.properties.filter(
      x => {
        this.newprice = parseInt(x.SellPrice.replace(/,/g, ""))
        this.newCprice = parseInt(x.CostestimateB.replace(/,/g, ""))
        this.newMprice = parseInt(x.MarketPrice.replace(/,/g, ""))
        return (this.newprice >= 500000 && this.newprice <= 1000000 && this.filter.priceA) || (this.newprice >= 1100000 && this.newprice <= 5000000 && this.filter.priceB) || (this.newprice >= 5100000 && this.newprice <= 10000000 && this.filter.priceC) || (this.newprice >= 10000000 && this.filter.priceD)
          || (this.newCprice > 500000 && this.newCprice <= 1000000 && this.filter.priceE) || (this.newCprice >= 1100000 && this.newCprice <= 5000000 && this.filter.priceF) || (this.newCprice >= 5100000 && this.newCprice <= 10000000 && this.filter.priceG) || (this.newCprice >= 10000000 && this.filter.priceH)
          || (this.newMprice > 500000 && this.newMprice <= 1000000 && this.filter.priceI) || (this.newMprice >= 1100000 && this.newMprice <= 5000000 && this.filter.priceJ) || (this.newMprice >= 5100000 && this.newMprice <= 10000000 && this.filter.priceK) || (this.newMprice >= 10000000 && this.filter.priceL)
      });
    if ((this.filterProperty.length == 0 && this.filter.priceA) || (this.filterProperty.length == 0 && this.filter.priceB) || (this.filterProperty.length == 0 && this.filter.priceC) || (this.filterProperty.length == 0 && this.filter.priceD) || (this.filterProperty.length == 0 && this.filter.priceE) ||
      (this.filterProperty.length == 0 && this.filter.priceF) || (this.filterProperty.length == 0 && this.filter.priceG) || (this.filterProperty.length == 0 && this.filter.priceH) || (this.filterProperty.length == 0 && this.filter.priceI) || (this.filterProperty.length == 0 && this.filter.priceJ) || (this.filterProperty.length == 0 && this.filter.priceK) || (this.filterProperty.length == 0 && this.filter.priceL)) {
      this.propertiesclone.length = 0
    } else if ((this.filterProperty.length == 0 && this.filter.priceA == false) || (this.filterProperty.length == 0 && this.filter.priceB == false) || (this.filterProperty.length == 0 && this.filter.priceC == false) || (this.filterProperty.length == 0 && this.filter.priceD == false) || (this.filterProperty.length == 0 && this.filter.priceE == false) ||
      (this.filterProperty.length == 0 && this.filter.priceF == false) || (this.filterProperty.length == 0 && this.filter.priceG == false) || (this.filterProperty.length == 0 && this.filter.priceH == false) || (this.filterProperty.length == 0 && this.filter.priceI == false) || (this.filterProperty.length == 0 && this.filter.priceJ == false) || (this.filterProperty.length == 0 && this.filter.priceK == false) || (this.filterProperty.length == 0 && this.filter.priceL == false)) {
      this.auth.getland().subscribe((land) => {

        this.totalItem = land.length;
        this.propertiesclone = land;
      })
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

