import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, locationsDetails } from '../../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-landslist',
  templateUrl: './landslist.component.html',
  styleUrls: ['./landslist.component.css']
})
export class LandslistComponent implements OnInit {
  details: PropertyDetails[];
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  // filter ประเภทบ้าน
  filter = { yellow: false, orange: false, brown: false, red: false, purple: false, plum: false, green: false, whitegreen: false, brownweak: false, blue: false };
  properties: PropertyDetails[] = []; // สร้าง array เปล่ารอรับค่าจาก checkbox
  filterProperty: PropertyDetails[] = [];
  searchTerm: string;
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า variable
  public iPage:number[] = [];
  public iPageStart:number = 1;
  public prevPage:number;
  public nextPage:number;
  public activePage:number;
  public totalItem:number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage:number = 9; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage:number;
  public maxShowPage:number;
  public useShowPage:number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart:number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd:number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล

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
  
  constructor(private auth: AuthenticationService, private route: ActivatedRoute,
    private router:Router) {}

    // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
  changePage(page:number){
    this.activePage = page;
    this.router.navigate(['/lands'], {queryParams:{page:page}});
  }
 
  pagination(){
    if(this.activePage > this.useShowPage){
      if(this.activePage+2 <= this.totalPage){
        this.iPageStart = this.activePage-2;
        this.maxShowPage = this.activePage+2;
      }else{
        if(this.activePage <= this.totalPage){
          this.iPageStart = (this.totalPage+1)-this.useShowPage;
          this.maxShowPage = (this.iPageStart-1)+this.useShowPage;
        }
      }
      this.iPage = [];
      for(let i=this.iPageStart;i<=this.maxShowPage;i++){
        this.iPage.push(i);
      }            
    }else{
      this.iPageStart = 1;
      this.iPage = [];
      for(let i=this.iPageStart;i<=this.useShowPage;i++){
        this.iPage.push(i);
      }              
    }   
     
  }
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า

  ngOnInit() {
 // ส่วนจัดการเกี่ยวกับการแบ่งหน้า
 this.activePage = 1;
 this.nextPage = 2;
 this.pointEnd = this.perPage*this.activePage;

 this.totalPage = Math.ceil(this.totalItem/this.perPage);
 if(this.totalPage>this.useShowPage){
   this.useShowPage = 5;
 }else{
   this.useShowPage = this.totalPage;
 }

 for(let i=this.iPageStart;i<=this.useShowPage;i++){
   this.iPage.push(i);
 }

 this.route
 .queryParams
 .subscribe((data: { page: any }) => {
   if(data!=null && data.page!=null){
     this.activePage = +data.page;   
     this.prevPage = this.activePage-1;
     this.nextPage = this.activePage+1;   
     this.pointStart = (this.activePage-1)*this.perPage;
     this.pointEnd = this.perPage*this.activePage;
     this.pagination();
   }
 });    
 // ส่วนจัดการเกี่ยวกับการแบ่งหน้า

 // ส่วนของการดึงข้อมูล
 this.auth.getland().subscribe((land) =>
    {

      this.totalItem = land.length;
      this.properties = land;
      this.propertiesclone = land;
    })
// ส่วนของการรับค่า paramMap ที่ส่งกลับมาจากหน้า รายละเอียด
    let params = this.route.snapshot.paramMap;
    if(params.has('id')){
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
    if((this.filterProperty.length == 0 && this.filter.yellow)||(this.filterProperty.length == 0 && this.filter.orange)||(this.filterProperty.length == 0 && this.filter.brown)||
    (this.filterProperty.length == 0 && this.filter.red)||(this.filterProperty.length == 0 && this.filter.purple)||(this.filterProperty.length == 0 && this.filter.plum)){
      this.propertiesclone.length=0
    } else if((this.filterProperty.length == 0 && this.filter.yellow ==false)||(this.filterProperty.length == 0 && this.filter.orange ==false)||(this.filterProperty.length == 0 && this.filter.brown ==false)||
    (this.filterProperty.length == 0 && this.filter.red ==false)||(this.filterProperty.length == 0 && this.filter.purple ==false)||(this.filterProperty.length == 0 && this.filter.plum ==false)){
      this.auth.getland().subscribe((land) =>
    {

      this.totalItem = land.length;
      this.propertiesclone = land;
    })
    }
    
  }

}
