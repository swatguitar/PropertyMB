import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails, TokenPayload } from "../../../authentication.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup } from '@angular/forms';
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
  public perPage: number = 9; // จำนวนรายการที่แสดงต่อหน้า
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

  totalItemsearch: number;
  propertiesclone: any[];
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


  constructor(private auth: AuthenticationService, private route: ActivatedRoute, private router: Router) { }


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
    },
      err => {
        console.error(err)

      }
    )
    this.filterChange()
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
        (x.PropertyType === "บ้าน" && this.filter.houses) ||
        (x.PropertyType === "คอนโด" && this.filter.condo) ||
        (x.PropertyType === "อาคารพาณิชย์" && this.filter.property) ||
        (x.HomeCondition === "ใหม่" && this.filter.newhouse) ||
        (x.HomeCondition === "มือสอง" && this.filter.oldhouse)
    );
    if ((this.filterProperty.length == 0 && this.filter.houses) || (this.filterProperty.length == 0 && this.filter.condo) || (this.filterProperty.length == 0 && this.filter.property) ||
      (this.filterProperty.length == 0 && this.filter.newhouse) || (this.filterProperty.length == 0 && this.filter.oldhouse)) {
      this.propertiesclone.length = 0
    } else if ((this.filterProperty.length == 0 && this.filter.houses == false) || (this.filterProperty.length == 0 && this.filter.condo == false) || (this.filterProperty.length == 0 && this.filter.property == false) ||
      (this.filterProperty.length == 0 && this.filter.newhouse == false) || (this.filterProperty.length == 0 && this.filter.oldhouse == false)) {
      this.auth.gethouse().subscribe((house) => {

        this.totalItem = house.length;
        this.propertiesclone = house;
      })
    }
    this.totalItem = this.filterProperty.length;
  }


}
