import { Component, ViewChild,ElementRef } from '@angular/core';
import { AuthenticationService, UserDetails, PropertyDetails, TokenPayload } from '../../authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  today: number = Date.now();
  credentials: TokenPayload = {
    ID_User: 0,
    Firstname: '',
    Lastname: '',
    UserType: '',
    Email: '',
    Token: '',
    Answer: '',
    OldPassword: '',
    Password: '',
    Birthday: '',
    CodeProperty: '',
    LocationU: '',
    Phone: '',
    ProfileImg: '',
    Age: '',
    Gender: '',
    ID_Property: '',
    PropertyType: '',
    AnnounceTH: '',
    CodeDeed: '',
    SellPrice: '',
    Costestimate: '',
    CostestimateB: '',
    MarketPrice: '',
    BathRoom: '',
    BedRoom: '',
    CarPark: '',
    HouseArea: 0,
    Floor: '',
    LandR: '',
    LandG: '',
    LandWA: '',
    LandU: '',
    HomeCondition: '',
    BuildingAge: '',
    BuildFD: '',
    BuildFM: '',
    BuildFY: '',
    Directions: '',
    RoadType: '',
    RoadWide: '',
    GroundLevel: '',
    GroundValue: '',
    MoreDetails: '',
    Latitude: 0,
    Longitude: 0,
    AsseStatus: '',
    ObservationPoint: '',
    Location: '',
    LProvince: '',
    LAmphur: '',
    LDistrict: '',
    LZipCode: '',
    ContactU: '',
    ContactS: '',
    ContactUo: '',
    ContactSo: '',
    ContactUt: '',
    ContactSt: '',
    LandAge: '',
    PPStatus: '',
    ImageEX: '',
    TypeCode: '',
    PriceWA: '',
    WxD: '',
    Owner: '',
    //------ forniture-----
    ShuttleBus: 0,
    Publicarea: 0,
    Fitness: 0,
    pool: 0,
    Securityguard: 0,
    CCTV: 0,
    shelves: 0,
    sofa: 0,
    bed: 0,
    TCset: 0,
    wardrobe: 0,
    gasstove: 0,
    microwave: 0,
    refrigerator: 0,
    TV: 0,
    WIFI: 0,
    Waterheater: 0,
    AirPurifier: 0,
    afan: 0,
    airconditioner: 0,

    //-------locate--
    Blind: 0,
    Neareducation: 0,
    Cenmarket: 0,
    Market: 0,
    River: 0,
    Mainroad: 0,
    Insoi: 0,
    Letc: '',
    WVmachine: 0,
    CWmachine: 0,
    Elevator: 0,
    Lobby: 0,
    ATM: 0,
    BeautySalon: 0,
    Hairsalon: 0,
    Laundry: 0,
    Store: 0,
    Balcony: 0,
    MeetingR: 0,
    EventR: 0,
    Kitchen: 0,
    LivingR: 0,
    Supermarket: 0,
    CStore: 0,
    MFee: '',
    ID_Lands: '',
    ColorType: '',
    PricePM: '',
    Land: '',
    Deed: '',
    Place: '',
    imgProperty: null,
    //------ contact ------
    ID_Contact: '',
    ContactName: " ",
    ContactEmail: " ",
    ContactLine: " ",
    ContactPhone: " ",
  }
  public details: any[];
  public results: any[];
  public loading: any;
  emptyL: string = 'false';
  emptyP: string = 'false';
  public Groups: any;
  public pointStartG: number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEndR: number = 5; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointStart: number = 0; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  public pointEnd: number = 3; // ค่าส่วนนี้ใช้การกำหนดการแสดงข้อมูล
  showSpinner: boolean = true;
  AllProperty: any[];
  AllShortTrem: any[];
  AllLongTrem: any[];
  HouseShortTerm: any;
  HouseLongTerm: any;
  LandShortTerm: any;
  LandLongTerm: any;
  showSpinnerR: boolean = true;
  TotalRS: number;
  TotalRL: number;
  constructor(private auth: AuthenticationService, private router: Router, private spinner: NgxSpinnerService) { }
  @ViewChild('widgetsContent', { static: true }) public widgetsContent: ElementRef<any>;
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    this.loading = [1, 2, 3]
    this.AllProperty = []
    this.HouseShortTerm = []
    this.HouseLongTerm = []
    this.LandShortTerm = []
    this.LandLongTerm = []
    this.AllLongTrem = []
    this.AllShortTrem = []
    this.getHouse()
    this.getLand()
    this.getGroup()
    setTimeout(() => {
     this.concatHouse()
     this.concatLand()
     
    }, 5000)
  }
  mousewheel(event: WheelEvent) {
    var item = document.getElementsByTagName('MAIN')[0];
    console.log(item)
    if (event.deltaY > 0) {
      this.scrollRight()
    } else {
      this.scrollLeft()
    }
}
public scrollRight(): void {
  this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
}

public scrollLeft(): void {
  this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
}

  //************* get house that new edit or add *************
  getHouse() {
    this.auth.gethouse().subscribe((house) => {
      if (house.length != 0) {
        console.log(house)
        this.details = house


        
        console.log("......."+this.details)
        this.HouseShortTerm = house.filter(article => {
          return article.UserType == 'Short-Term';
        });
        this.HouseLongTerm = house.filter(article => {
          return article.UserType == 'Long-Term';
        });
        this.details.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
        //this.concatHouse()
        this.showSpinner = false
      }
      else {
        this.showSpinner = false
        this.emptyP = 'true'
      }
    },
      err => {
        console.error(err)
      }
    )
  }

  //************* get land that new edit or add *************
  getLand() {
    this.auth.getland().subscribe((land) => {
      if (land.length != 0) {
        this.results = land;
        this.LandShortTerm = land.filter(article => {
          return article.UserType == 'Short-Term';
        });
        this.LandLongTerm = land.filter(article => {
          return article.UserType == 'Long-Term';
        });
        this.results.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
        //this.concatLand()
        this.showSpinner = false
      }
      else {
        this.showSpinner = false
        this.emptyL = 'true'  
      }
    },
      err => {
        console.error(err)
      }
    ) 
  }

//************* concat house and land *************
  concatHouse() {
      this.AllShortTrem = this.HouseShortTerm.concat(this.LandShortTerm);
      this.AllShortTrem.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      this.TotalRS = this.AllShortTrem.length
      console.log(this.TotalRS)
      this.showSpinnerR = false
  }
  concatLand() {
      this.AllLongTrem = this.HouseLongTerm.concat(this.LandLongTerm);
      this.AllLongTrem.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      this.TotalRL = this.AllLongTrem.length
      console.log(this.TotalRL)
      this.showSpinnerR = false
  }

 //************* get group  *************
  getGroup(){
    this.auth.getgroup().subscribe((group) => {
      if(group){
        this.Groups = group;
        this.Groups.sort((a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime());
      }
    },
      err => {
        console.error(err)
      }
    )
  }

  
}

