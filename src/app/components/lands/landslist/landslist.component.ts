import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails } from '../../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-landslist',
  templateUrl: './landslist.component.html',
  styleUrls: ['./landslist.component.css']
})
export class LandslistComponent implements OnInit {
  details: PropertyDetails[];
  public highlightId:number; // สำหรับเก็บ id ที่เพิ่งเข้าดู
  
  // ส่วนจัดการเกี่ยวกับการแบ่งหน้า variable
  public iPage:number[] = [];
  public iPageStart:number = 1;
  public prevPage:number;
  public nextPage:number;
  public activePage:number;
  public totalItem:number = 100; // สมมติจำนวนรายการทั้งหมดเริ่มต้น หรือเป็น 0 ก็ได้
  public perPage:number = 10; // จำนวนรายการที่แสดงต่อหน้า
  public totalPage:number;
  public maxShowPage:number;
  public useShowPage:number = 5; // จำนวนปุ่มที่แสดง ใช้แค่ 5 ปุ่มตัวเลข
  public pointStart:number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd:number; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล


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
      this.details = land;
      
    })
// ส่วนของการรับค่า paramMap ที่ส่งกลับมาจากหน้า รายละเอียด
    let params = this.route.snapshot.paramMap;
    if(params.has('id')){
      // เก็บ id รายการที่เพิ่งเข้าไปดู ใส่เครื่องหมาย + ด้านหน้าเพื่อทำให็ 
      // string แปลงเป็นตัวแปร number
      this.highlightId = +params.get('id');
    }    

  }

}
