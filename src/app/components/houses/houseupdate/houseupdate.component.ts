import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, ID, TokenPayload, locationsDetails, PropertyH, PropertyDetails, Location,UserType } from '../../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-houseupdate',
  templateUrl: './houseupdate.component.html',
  styleUrls: ['./houseupdate.component.css']
})
export class HouseupdateComponent implements OnInit {
  public postID: string;
  public activePage: number;
  results: PropertyDetails[];
  details: PropertyH;
  EdithouseForm: FormGroup;
  EditContactForm: FormGroup;
  EditContact2Form: FormGroup;
  EditContact3Form: FormGroup;
  CreateContactForm: FormGroup;
  submitted = false;
  back: string = "false"
  keyword = 'Name';
  contactUser: any[];
  selectContact3: any[];
  selectContact: any[];
  selectContact2: any[];
  selectedItem: any = '';
  inputChanged: any = '';
  IDcontact1: string
  IDcontact2: string
  IDcontact3: string
  IDcon: any;
  ContactID: string;
  UpdatedS: boolean = false;
  UpdatedC: boolean = false;
  UpdatedM: boolean = false;
  Updated1: boolean = false;
  Updated2: boolean = false;
  Updated3: boolean = false;
  Updated4: boolean = false;
  Updated5: boolean = false;
  Updated6: boolean = false;
  Updated7: boolean = false;
  Updated8: boolean = false;
  Updated9: boolean = false;
  Updated10: boolean = false;
  Updated11: boolean = false;
  Updated12: boolean = false;
  Updated13: boolean = false;
  Updated14: boolean = false;
  Updated15: boolean = false;
  Updated16: boolean = false;
  Updated17: boolean = false;
  Updated18: boolean = false;
  Updated19: boolean = false;
  Updated20: boolean = false;
  Updated21: boolean = false;
  Updated22: boolean = false;
  Updated23: boolean = false;
  Updated24: boolean = false;
  Updated25: boolean = false;
  Updated26: boolean = false;
  Updated27: boolean = false;
  Updated28: boolean = false;
  Updated29: boolean = false;
  Updated30: boolean = false;
  Updated31: boolean = false;
  Updated32: boolean = false;
  Updated33: boolean = false;
  Updated34: boolean = false;
  Updated35: boolean = false;
  Updated36: boolean = false;
  Updated37: boolean = false;
  Updated38: boolean = false;
  Updated39: boolean = false;
  Updated40: boolean = false;
  Updated41: boolean = false;
  Updated42: boolean = false;
  Updated43: boolean = false;
  UpdatedZ: boolean;
  zipcodeOld: any;
  showSpinner: boolean;
  SelectContact: boolean = true;
  EditC: boolean = true;
  reset: boolean;


  constructor(private auth: AuthenticationService, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private route: ActivatedRoute) {
    this.EdithouseForm = new FormGroup({
      PropertyType: new FormControl(''),
      AnnounceTH: new FormControl(''),
      SellPrice: new FormControl(''),
      CodeDeed: new FormControl(''),
      Costestimate: new FormControl(''),
      MarketPrice: new FormControl(''),
      HouseArea: new FormControl(''),
      BathRoom: new FormControl(''),
      BedRoom: new FormControl(''),
      CarPark: new FormControl(''),
      Floor: new FormControl(''),
      MFee: new FormControl(''),
      HomeCondition: new FormControl(''),
      BuildFD: new FormControl(''),
      BuildFM: new FormControl(''),
      BuildFY: new FormControl(''),
      AsseStatus: new FormControl(''),
      BuildingAge: new FormControl(''),
      Directions: new FormControl(''),
      LandR: new FormControl(''),
      LandG: new FormControl(''),
      LandWA: new FormControl(''),
      Location: new FormControl(''),
      Lprovince: new FormControl(''),
      Lamphur: new FormControl(''),
      Ldistrict: new FormControl(''),
      ZIPCODE: new FormControl(''),
    });
    this.EditContactForm = new FormGroup({
      ContactName: new FormControl(''),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit: new FormControl(''),
      ContactS: new FormControl(''),
    });
    this.EditContact2Form = new FormGroup({
      ContactName: new FormControl(''),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit2: new FormControl(''),
      ContactSt: new FormControl(''),
    });
    this.EditContact3Form = new FormGroup({
      ContactName: new FormControl(''),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit3: new FormControl(''),
      ContactSo: new FormControl(''),
    });
    this.CreateContactForm = new FormGroup({
      ContactName: new FormControl(''),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
    });
  }
  EDITED: boolean = false;
  zoom: number = 5;
  latitude: number;
  longitude: number;
  NextstepCon: boolean = false
  address: string;
  province: any;
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  amphur: any[];
  PA: locationsDetails;
  district: any;
  zipcode: any[];
  private geoCoder;
  createID: string
  years: any[];
  conID1: string
  conID2: string
  conID3: string
  Name1: string = ''
  Name2: string = ''
  Name3: string = ''
  conName1: string
  conName2: string
  conName3: string
  conEmail1: string
  conEmail2: string
  conEmail3: string
  conPhone1: string
  conPhone2: string
  conPhone3: string
  conLine1: string
  conLine2: string
  conLine3: string
  allowedit: boolean = false
  allowedit2: string
  allowedit3: string
  con1selected: string = "false"
  con2selected: string = "false"
  con3selected: string = "false"
  conS1: string;
  conS2: string;
  conS3: string;
  lonnew: number;
  latnew: number;
  lat: number;
  lng: number;
  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  SelectID: ID = {
    ID_Lands: '',
    ID_Property: '',
    PPStatus: '',
    ContactU: '',
    ContactUo: '',
    ContactUt: '',
  }
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
    ContactName: '',
    ContactEmail: '',
    ContactLine: '',
    ContactPhone: '',
  }
  Location: Location = {
    PROVINCE_ID: null,
    AMPHUR_ID: null,
    DISTRICT_ID: null,
    ZIPCODE_ID: null
  }
  UserType: UserType = {
    ID_Property: '',
    ID_Lands: '',
    ID_Photo: '',
    UserType: '',
    LProvince: '',
    PriceMax: null,
    PriceMin: null
  }
  ID_user: string = (this.auth.getUserDetails().ID_User).toString()


  onGo() {
    this.submitted = true;
    if (this.EdithouseForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if (this.SelectContact == false && this.Name1 != '' ) {//***************************************IF contact 1 not select */
      this.submitted = true;
      if (this.EditContactForm.invalid) {
        alert(JSON.stringify("กรุณากรอกข้อมูลติดต่อ"))
        return;
      }
      this.setDataContactA()
      this.CheckDuplicateIDContact()
      this.credentials.ContactU = this.credentials.ID_Contact
    } else {//***************************************IF contact 1/4 not select */
      if (this.EdithouseForm.invalid) {
        alert(JSON.stringify("กรุณากรอกข้อมูล"))
        return;
      }
      this.onUpdate()
    }
  }


  get f() { return this.EdithouseForm.controls; }
  get E() { return this.EditContactForm.controls; }
  get Et() { return this.EditContact2Form.controls; }
  get Eo() { return this.EditContact3Form.controls; }
  get C() { return this.CreateContactForm.controls; }

  //************* Check "," and number *************
  CommaFormattedS(event) {
    if (event.which >= 37 && event.which <= 40) return;
    if (this.credentials.SellPrice) {
      this.credentials.SellPrice = this.credentials.SellPrice.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedB(event) {
    if (event.which >= 37 && event.which <= 40) return;
    if (this.credentials.CostestimateB) {
      this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedM(event) {
    if (event.which >= 37 && event.which <= 40) return;
    if (this.credentials.MarketPrice) {
      this.credentials.MarketPrice = this.credentials.MarketPrice.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  numberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.showSpinner = true
    this.zipcodeOld = []
    //************* แบ่งหน้า ************* 
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.SelectID.ID_Property = this.postID;
    this.LoadMap()
    this.GetProvince()
    this.GetHouse()
    this.GetNowYear()
  }

  //************* Set Map from google *************
  LoadMap() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [], componentRestrictions: { 'country': 'TH' }
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  //************* Get house by id property *************
  GetHouse() {
    this.auth.houseUpdate(this.SelectID).subscribe((house) => {
      this.results = house
      this.details = house
      this.SelectID.ContactU = house[0].ContactU
      this.SelectID.ContactUt = house[0].ContactUt
      this.SelectID.ContactUo = house[0].ContactUo
      this.conS1 = house[0].ContactS
      this.conS2 = house[0].ContactSt
      this.conS3 = house[0].ContactSo
      this.latitude = Number(house[0].Latitude)
      this.longitude = Number(house[0].Longitude)
      this.zoom = 15
      this.zipcodeOld.push(house[0].LZipCode)
      this.getContact()
      this.showSpinner = false
    },
      err => {
        console.error(err)
      })
  }


  //************* get contact *************
  getContact() {
    this.selectContact = []
    this.auth.getContactDetail(this.SelectID).subscribe((contactUser) => {
      if (contactUser.length != 0) {
        this.contactUser = contactUser;
        this.selectContact.push(this.contactUser[0])
        this.SetContactA()
      }
    },
      err => {
        console.error(err)
      }
    )
  }

  //************* Get Current Location Coordinates *************
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  //************* get province *************
  GetProvince() {
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

  //************* get present year *************
  GetNowYear() {
    var year = new Date().getFullYear();
    var yearth = year + 543
    var range = [];
    range.push(yearth);
    for (var i = 1; i < 100; i++) {
      range.push(yearth - i);

    }
    this.years = range;
  }

  //************* Calculate Build age and set it *************
  buildage: number
  onGetbuildage(year) {
    var yearEN = new Date().getFullYear();
    this.buildage = ((yearEN + 543) - year);
    this.credentials.BuildingAge = this.buildage.toString()
  }

  //************* get contact that owner *************
  GetContact() {
    this.auth.getContact().subscribe((contactUser) => {
      if (contactUser) {
        this.contactUser = contactUser;
        console.log(contactUser)
      }
    },
      err => {
        console.error(err)
      })
  }
  onEditContact1() {
    this.setDataContactA()
    this.auth.EditContact(this.credentials).subscribe((result) => {
      if(!result.error){
        alert(JSON.stringify(result))
        this.GetContact()
      }else{
        alert(JSON.stringify(result.error))
      } 
    },
      err => {
        console.error(err)
        alert(JSON.stringify(err.error.error))
      }
    )
  }


  onGetContact(item) {
    this.EditC = true
    this.SelectContact = true
    console.log(this.credentials.ContactName)
    this.conID1 = item.ID_Contact
    this.conName1 = item.Name
    this.conEmail1 = item.Email
    this.conPhone1 = item.Phone
    this.conLine1 = item.Line
    this.credentials.ContactU = item.ID_Contact
    this.credentials.ContactUt = item.ID_Contact
    this.credentials.ContactUo = item.ID_Contact
  }

  onFocused(e) {
    // do something when input is focused
  }
   //************* check edit button do this *************
  onEditContactID1(value) {
    console.log(this.allowedit)
    if(this.allowedit == true){
      this.EditC = false
      this.reset = false
      this.credentials.ID_Contact = value
    }else{
      this.EditC = true
      this.reset = true
    }
  }
   //************* change name do this  *************
  onEditContactName1(value: string) {
    console.log(this.reset)
    if(this.allowedit == false){
      this.EditC = false
      this.SelectContact = false
      this.conPhone1 = null
      this.conEmail1 = null
      this.conLine1 = null
      this.conName1 = value
    }else{
      this.conName1 = value
      this.SelectContact = true
      this.EditC = false
    }
    
  }
  onEditContactLine1(value) {
    this.conLine1 = value
    //console.log(this.conLine1)
  }
  onEditContactPhone1(value) {
    this.conPhone1 = value
    //console.log(this.conPhone1)
  }
  onEditContactEmail1(value) {
    this.conEmail1 = value
    //console.log(this.conEmail1)
  }
 
  //************* set data contact  1 *************
  setDataContactA() {
    this.credentials.ContactName = this.conName1
    this.credentials.ContactPhone = this.conPhone1
    this.credentials.ContactEmail = this.conEmail1
    this.credentials.ContactLine = this.conLine1
  }

  //************* set data contact 1 To Display  *************
  SetContactA() {
    console.log(this.selectContact)
    this.selectContact.forEach((element, index) => {
      this.Name1 = element.Name
      this.conEmail1 = element.Email
      this.conPhone1 = element.Phone
      this.conLine1 = element.Line
      this.conID1 = element.ID_Contact
    });
  }
  
  //************* Random ID contact *************
  onRandomcontact() {
    var max = 9;
    var min = 0;
    var r = Math.floor(Math.random() * (max - min + 1) + min);
    var x = Math.floor(Math.random() * (max - min + 1) + min);
    var y = Math.floor(Math.random() * (max - min + 1) + min);
    var z = Math.floor(Math.random() * (max - min + 1) + min);
    this.SelectID.ContactU = this.ID_user + r + x + y + z;

  }

  //************* Check Duplicate ID contact *************
  CheckDuplicateIDContact() {
    this.onRandomcontact()
    this.auth.getContactDuplicate(this.SelectID).subscribe((contact) => {
      if (contact.length != 0) {
        this.onRandomcontact()
        this.CheckDuplicateIDContact()
      }
      else {
        this.credentials.ID_Contact = this.SelectID.ContactU
        if (this.credentials.ID_Contact != '') {
          this.CreateContact()
        }
      }
    },
      err => {
        console.error(err)
      })
  }

  //************* CreateContact *************
    CreateContact() {
    this.auth.addcontact(this.credentials).subscribe(
      (result) => {
        if(result){
          this.credentials.ContactU = this.credentials.ID_Contact
          this.credentials.ContactUt = this.credentials.ID_Contact
          this.credentials.ContactUo = this.credentials.ID_Contact
          this.onUpdate()
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  //************* get ADDRESS  *************
  PROVINCE_NAME: string
  selectprovince(data) {
    this.credentials.LProvince = data.PROVINCE_NAME
    this.Location.PROVINCE_ID = data.PROVINCE_ID
    this.zipcodeOld.length = 0
    this.auth.getAmphur(this.Location).subscribe((amphur) => {
      this.amphur = amphur
      this.amphur.sort((a, b) => a.AMPHUR_NAME.localeCompare(b.AMPHUR_NAME));
    },
      err => {
        console.error(err)
      })
  }
  selectamphur(data) {
    this.credentials.LAmphur = data.AMPHUR_NAME
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
    this.credentials.LDistrict = data.DISTRICT_NAME
    this.Location.DISTRICT_ID = data.DISTRICT_ID
    this.UpdatedZ = true
    this.auth.getZipcode(this.Location).subscribe((zipcode) => {
      this.zipcode = zipcode
    },
      err => {
        console.error(err)
      })
  }
  getZipCode() {
    this.zipcode.forEach((element, index) => {
      this.credentials.LZipCode = element.ZIPCODE
    });
  }

  //************* Get DATA *************
  onGetAnnounceTH(value) {
    this.credentials.AnnounceTH = value
  }
  onGetCodeDeed(value) {
    this.credentials.CodeDeed = value
  }
  onGetSell(value) {
    this.UpdatedS = true;
    this.credentials.SellPrice = value
  }
  onGetSellB(value) {
    this.UpdatedC = true;
    this.credentials.CostestimateB = value
  }
  onGetSellM(value) {
    this.UpdatedM = true;
    this.credentials.MarketPrice = value
  }
  onGetHouseArea(value) {
    this.credentials.HouseArea = value
  }
  onGetBathRoom(value) {
    this.credentials.BathRoom = value
  }
  onGetBedRoom(value) {
    this.credentials.BedRoom = value
  }
  onGetCarPark(value) {
    this.credentials.CarPark = value
  }
  onGetFloor(value) {
    this.credentials.Floor = value
  }
  onGetMFee(value) {
    this.credentials.MFee = value
  }
  onGetHomeCondition(value) {
    this.credentials.HomeCondition = value
  }
  onGetAsseStatus(value) {
    this.credentials.AsseStatus = value
    console.log(this.credentials.AsseStatus)
  }
  onGetBuildFD(value) {
    this.credentials.BuildFD = value
  }
  onGetBuildFM(value) {
    this.credentials.BuildFM = value
  }


  onGetDirections(value) {
    this.credentials.Directions = value
  }
  airconditioner(value) {
    this.Updated1 = true
    if (value == true) {
      this.credentials.airconditioner = 1
    } else {
      this.credentials.airconditioner = 0
    }
  }
  afan(value) {
    this.Updated2 = true
    if (value == true) {
      this.credentials.afan = 1
    } else {
      this.credentials.afan = 0
    }
  }
  AirPurifier(value) {
    this.Updated3 = true
    if (value == true) {
      this.credentials.AirPurifier = 1
    } else {
      this.credentials.AirPurifier = 0
    }
  }
  Waterheater(value) {
    this.Updated4 = true
    if (value == true) {
      this.credentials.Waterheater = 1
    } else {
      this.credentials.Waterheater = 0
    }
  }
  WIFI(value) {
    this.Updated5 = true
    if (value == true) {
      this.credentials.WIFI = 1
    } else {
      this.credentials.WIFI = 0
    }
  }
  TV(value) {
    this.Updated6 = true
    if (value == true) {
      this.credentials.TV = 1
    } else {
      this.credentials.TV = 0
    }
  }
  refrigerator(value) {
    this.Updated7 = true
    if (value == true) {
      this.credentials.refrigerator = 1
    } else {
      this.credentials.refrigerator = 0
    }
  }
  microwave(value) {
    this.Updated8 = true
    if (value == true) {
      this.credentials.microwave = 1
    } else {
      this.credentials.microwave = 0
    }
  }
  gasstove(value) {
    this.Updated9 = true
    if (value == true) {
      this.credentials.gasstove = 1
    } else {
      this.credentials.gasstove = 0
    }
  }
  wardrobe(value) {
    this.Updated10 = true
    if (value == true) {
      this.credentials.wardrobe = 1
    } else {
      this.credentials.wardrobe = 0
    }
  }
  TCset(value) {
    this.Updated11 = true
    if (value == true) {
      this.credentials.TCset = 1
    } else {
      this.credentials.TCset = 0
    }
  }
  sofa(value) {
    this.Updated12 = true
    if (value == true) {
      this.credentials.sofa = 1
    } else {
      this.credentials.sofa = 0
    }
  }
  bed(value) {
    this.Updated13 = true
    if (value == true) {
      this.credentials.bed = 1
    } else {
      this.credentials.bed = 0
    }
  }
  shelves(value) {
    this.Updated14 = true
    if (value == true) {
      this.credentials.shelves = 1
    } else {
      this.credentials.shelves = 0
    }
  }
  Securityguard(value) {
    this.Updated15 = true
    if (value == true) {
      this.credentials.Securityguard = 1
    } else {
      this.credentials.Securityguard = 0
    }
  }
  pool(value) {
    this.Updated16 = true
    if (value == true) {
      this.credentials.pool = 1
    } else {
      this.credentials.pool = 0
    }
  }
  Fitness(value) {
    this.Updated17 = true
    if (value == true) {
      this.credentials.Fitness = 1
    } else {
      this.credentials.Fitness = 0
    }
  }
  Publicarea(value) {
    this.Updated18 = true
    if (value == true) {
      this.credentials.Publicarea = 1
    } else {
      this.credentials.Publicarea = 0
    }
  }
  ShuttleBus(value) {
    this.Updated19 = true
    if (value == true) {
      this.credentials.ShuttleBus = 1
    } else {
      this.credentials.ShuttleBus = 0
    }
  }
  WVmachine(value) {
    this.Updated20 = true
    if (value == true) {
      this.credentials.WVmachine = 1
    } else {
      this.credentials.WVmachine = 0
    }
  }
  CWmachine(value) {
    this.Updated21 = true
    if (value == true) {
      this.credentials.CWmachine = 1
    } else {
      this.credentials.CWmachine = 0
    }
  }
  Elevator(value) {
    this.Updated22 = true
    if (value == true) {
      this.credentials.Elevator = 1
    } else {
      this.credentials.Elevator = 0
    }
  }
  Lobby(value) {
    this.Updated23 = true
    if (value == true) {
      this.credentials.Lobby = 1
    } else {
      this.credentials.Lobby = 0
    }
  }
  CCTV(value) {
    this.Updated24 = true
    if (value == true) {
      this.credentials.CCTV = 1
    } else {
      this.credentials.CCTV = 0
    }
  }
  Kitchen(value) {
    this.Updated25 = true
    if (value == true) {
      this.credentials.Kitchen = 1
    } else {
      this.credentials.Kitchen = 0
    }
  }
  LivingR(value) {
    this.Updated26 = true
    if (value == true) {
      this.credentials.LivingR = 1
    } else {
      this.credentials.LivingR = 0
    }
  }
  EventR(value) {
    this.Updated27 = true
    if (value == true) {
      this.credentials.EventR = 1
    } else {
      this.credentials.EventR = 0
    }
  }
  MeetingR(value) {
    this.Updated28 = true
    if (value == true) {
      this.credentials.MeetingR = 1
    } else {
      this.credentials.MeetingR = 0
    }
  }
  Balcony(value) {
    this.Updated29 = true
    if (value == true) {
      this.credentials.Balcony = 1
    } else {
      this.credentials.Balcony = 0
    }
  }
  ATM(value) {
    this.Updated30 = true
    if (value == true) {
      this.credentials.ATM = 1
    } else {
      this.credentials.ATM = 0
    }
  }
  BeautySalon(value) {
    this.Updated31 = true
    if (value == true) {
      this.credentials.BeautySalon = 1
    } else {
      this.credentials.BeautySalon = 0
    }
  }
  CStore(value) {
    this.Updated32 = true
    if (value == true) {
      this.credentials.CStore = 1
    } else {
      this.credentials.CStore = 0
    }
  }
  Hairsalon(value) {
    this.Updated33 = true
    if (value == true) {
      this.credentials.Hairsalon = 1
    } else {
      this.credentials.Hairsalon = 0
    }
  }
  Laundry(value) {
    this.Updated34 = true
    if (value == true) {
      this.credentials.Laundry = 1
    } else {
      this.credentials.Laundry = 0
    }
  }
  Store(value) {
    this.Updated35 = true
    if (value == true) {
      this.credentials.Store = 1
    } else {
      this.credentials.Store = 0
    }
  }
  Supermarket(value) {
    this.Updated36 = true
    if (value == true) {
      this.credentials.Supermarket = 1
    } else {
      this.credentials.Supermarket = 0
    }
  }
  Blind(value) {
    this.Updated37 = true
    if (value == true) {
      this.credentials.Blind = 1
    } else {
      this.credentials.Blind = 0
    }
  }
  Neareducation(value) {
    this.Updated38 = true
    if (value == true) {
      this.credentials.Neareducation = 1
    } else {
      this.credentials.Neareducation = 0
    }
  }
  Cenmarket(value) {
    this.Updated39 = true
    if (value == true) {
      this.credentials.Cenmarket = 1
    } else {
      this.credentials.Cenmarket = 0
    }
  }
  Market(value) {
    this.Updated40 = true
    if (value == true) {
      this.credentials.Market = 1
    } else {
      this.credentials.Market = 0
    }
  }
  River(value) {
    this.Updated41 = true
    if (value == true) {
      this.credentials.River = 1
    } else {
      this.credentials.River = 0
    }
  }
  Mainroad(value) {
    this.Updated42 = true
    if (value == true) {
      this.credentials.Mainroad = 1
    } else {
      this.credentials.Mainroad = 0
    }
  }
  Insoi(value) {
    this.Updated43 = true
    //-----------
    if (value == true) {
      this.credentials.Insoi = 1
    } else {
      this.credentials.Insoi = 0
    }
  }
  Letc(value) {
    this.credentials.Letc = value
  }
  RoadType(value) {
    this.credentials.RoadType = value
  }
  GroundLevel(value) {
    this.credentials.GroundLevel = value
  }

  onGetLandR(value) {
    this.credentials.LandR = value
  }
  onGetLandG(value) {
    this.credentials.LandG = value
  }
  onGetLandWA(value) {
    this.credentials.LandWA = value
  }
  onGetGroundValue(value) {
    this.credentials.GroundValue = value
  }
  onGetRoadWide(value) {
    this.credentials.RoadWide = value
  }
  onGetMoreDetails(value) {
    this.credentials.MoreDetails = value
  }
  onGetObservationPoint(value) {
    this.credentials.ObservationPoint = value
  }
  onGetLocation(value) {
    this.credentials.Location = value
  }
  onGetStatusCon1(value) {
    this.credentials.ContactS = value
  }
  onGetStatusCon2(value) {
    this.credentials.ContactSt = value
  }
  onGetStatusCon3(value) {
    this.credentials.ContactSo = value
  }


  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.EdithouseForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if (this.credentials.PropertyType == '') {
      this.credentials.PropertyType = this.details.PropertyType
    }
    if (this.credentials.AnnounceTH == '') {
      this.credentials.AnnounceTH = this.details.AnnounceTH
    }
    if (this.credentials.CodeDeed == '') {
      this.credentials.CodeDeed = this.details.CodeDeed
    }
    if (this.credentials.SellPrice == '') {
      this.credentials.SellPrice = this.details.SellPrice
    }
    if (this.credentials.Costestimate == '') {
      this.credentials.Costestimate = this.details.Costestimate
    }
    if (this.credentials.CostestimateB == '') {
      this.credentials.CostestimateB = this.details.CostestimateB
    }
    if (this.credentials.MarketPrice == '') {
      this.credentials.MarketPrice = this.details.MarketPrice
    }
    if (this.credentials.BathRoom == '') {
      this.credentials.BathRoom = this.details.BathRoom
    }
    if (this.credentials.BedRoom == '') {
      this.credentials.BedRoom = this.details.BedRoom
    }
    if (this.credentials.CarPark == '') {
      this.credentials.CarPark = this.details.CarPark
    }
    if (this.credentials.HouseArea == 0) {
      this.credentials.HouseArea = this.details.HouseArea
    }
    if (this.credentials.Floor == '') {
      this.credentials.Floor = this.details.Floor
    }
    if (this.credentials.LandR == '') {
      this.credentials.LandR = this.details.LandR
    }
    if (this.credentials.LandG == '') {
      this.credentials.LandG = this.details.LandG
    }
    if (this.credentials.LandWA == '') {
      this.credentials.LandWA = this.details.LandWA
    }
    if (this.credentials.LandU == '') {
      this.credentials.LandU = this.details.LandU
    }
    if (this.credentials.HomeCondition == '') {
      this.credentials.HomeCondition = this.details.HomeCondition
    }
    if (this.credentials.BuildingAge == '') {
      this.credentials.BuildingAge = this.details.BuildingAge
    }
    if (this.credentials.BuildFD == '') {
      this.credentials.BuildFD = this.details.BuildFD
    }
    if (this.credentials.BuildFM == '') {
      this.credentials.BuildFM = this.details.BuildFM
    }
    if (this.credentials.AnnounceTH == '') {
      this.credentials.AnnounceTH = this.details.AnnounceTH
    }
    if (this.credentials.BuildFY == '') {
      this.credentials.BuildFY = this.details.BuildFY
    }
    if (this.credentials.Directions == '') {
      this.credentials.Directions = this.details.Directions
    }
    if (this.credentials.RoadType == '') {
      this.credentials.RoadType = this.details.RoadType
    }
    if (this.credentials.RoadWide == '') {
      this.credentials.RoadWide = this.details.RoadWide
    }
    if (this.credentials.GroundLevel == '') {
      this.credentials.GroundLevel = this.details.GroundLevel
    }
    if (this.credentials.GroundValue == '') {
      this.credentials.GroundValue = this.details.GroundValue
    }
    if (this.credentials.MoreDetails == '') {
      this.credentials.MoreDetails = this.details.MoreDetails
    }
    if (this.credentials.Latitude == 0) {
      this.credentials.Latitude = this.details.Latitude
    }
    if (this.credentials.Longitude == 0) {
      this.credentials.Longitude = this.details.Longitude
    }
    if (this.credentials.AsseStatus == '') {
      this.credentials.AsseStatus = this.details.AsseStatus
    }
    if (this.credentials.ObservationPoint == '') {
      this.credentials.ObservationPoint = this.details.ObservationPoint
    }
    if (this.credentials.Location == '') {
      this.credentials.Location = this.details.Location
    }
    if (this.credentials.LProvince == '') {
      this.credentials.LProvince = this.details.LProvince
    }
    if (this.credentials.LAmphur == '') {
      this.credentials.LAmphur = this.details.LAmphur
    }
    if (this.credentials.LDistrict == '') {
      this.credentials.LDistrict = this.details.LDistrict
    }
    if (this.credentials.LZipCode == '') {
      this.credentials.LZipCode = this.details.LZipCode
    }
    if (this.credentials.ContactU == '') {
      this.credentials.ContactU = this.details.ContactU
    }
    if (this.credentials.ContactS == '') {
      this.credentials.ContactS = this.details.ContactS
    }
    if (this.credentials.ContactUo == '') {
      this.credentials.ContactUo = this.details.ContactUo
    }
    if (this.credentials.ContactSo == '') {
      this.credentials.ContactSo = this.details.ContactSo
    }
    if (this.credentials.ContactUt == '') {
      this.credentials.ContactUt = this.details.ContactUt
    }
    if (this.credentials.ContactSt == '') {
      this.credentials.ContactSt = this.details.ContactSt
    }
    if (this.credentials.ContactSt == '') {
      this.credentials.ContactSt = this.details.ContactSt
    }
    if (this.credentials.airconditioner == 0 && this.Updated1 == false) {
      this.credentials.airconditioner = this.details.airconditioner
    }
    if (this.credentials.afan == 0 && this.Updated2 == false) {
      this.credentials.afan = this.details.afan
    }
    if (this.credentials.AirPurifier == 0 && this.Updated3 == false) {
      this.credentials.AirPurifier = this.details.AirPurifier
    }
    if (this.credentials.Waterheater == 0 && this.Updated4 == false) {
      this.credentials.Waterheater = this.details.Waterheater
    }
    if (this.credentials.WIFI == 0 && this.Updated5 == false) {
      this.credentials.WIFI = this.details.WIFI
    }
    if (this.credentials.TV == 0 && this.Updated6 == false) {
      this.credentials.TV = this.details.TV
    }
    if (this.credentials.refrigerator == 0 && this.Updated7 == false) {
      this.credentials.refrigerator = this.details.refrigerator
    }
    if (this.credentials.microwave == 0 && this.Updated8 == false) {
      this.credentials.microwave = this.details.microwave
    }
    if (this.credentials.gasstove == 0 && this.Updated9 == false) {
      this.credentials.gasstove = this.details.gasstove
    }
    if (this.credentials.wardrobe == 0 && this.Updated10 == false) {
      this.credentials.wardrobe = this.details.wardrobe
    }
    if (this.credentials.TCset == 0 && this.Updated11 == false) {
      this.credentials.TCset = this.details.TCset
    }
    if (this.credentials.sofa == 0 && this.Updated12 == false) {
      this.credentials.sofa = this.details.sofa
    }
    if (this.credentials.bed == 0 && this.Updated13 == false) {
      this.credentials.bed = this.details.bed
    }
    if (this.credentials.shelves == 0 && this.Updated14 == false) {
      this.credentials.shelves = this.details.shelves
    }
    if (this.credentials.Securityguard == 0 && this.Updated15 == false) {
      this.credentials.Securityguard = this.details.Securityguard
    }
    if (this.credentials.pool == 0 && this.Updated16 == false) {
      this.credentials.pool = this.details.pool
    }
    if (this.credentials.Fitness == 0 && this.Updated17 == false) {
      this.credentials.Fitness = this.details.Fitness
    }
    if (this.credentials.Publicarea == 0 && this.Updated18 == false) {
      this.credentials.Publicarea = this.details.Publicarea
    }
    if (this.credentials.ShuttleBus == 0 && this.Updated19 == false) {
      this.credentials.ShuttleBus = this.details.ShuttleBus
    }
    if (this.credentials.WVmachine == 0 && this.Updated20 == false) {
      this.credentials.WVmachine = this.details.WVmachine
    }
    if (this.credentials.CWmachine == 0 && this.Updated21 == false) {
      this.credentials.CWmachine = this.details.CWmachine
    }
    if (this.credentials.Elevator == 0 && this.Updated22 == false) {
      this.credentials.Elevator = this.details.Elevator
    }
    if (this.credentials.Lobby == 0 && this.Updated23 == false) {
      this.credentials.Lobby = this.details.Lobby
    }
    if (this.credentials.CCTV == 0 && this.Updated24 == false) {
      this.credentials.CCTV = this.details.CCTV
    }
    if (this.credentials.Kitchen == 0 && this.Updated25 == false) {
      this.credentials.Kitchen = this.details.Kitchen
    }
    if (this.credentials.LivingR == 0 && this.Updated26 == false) {
      this.credentials.LivingR = this.details.LivingR
    }
    if (this.credentials.EventR == 0 && this.Updated27 == false) {
      this.credentials.EventR = this.details.EventR
    }
    if (this.credentials.MeetingR == 0 && this.Updated28 == false) {
      this.credentials.MeetingR = this.details.MeetingR
    }
    if (this.credentials.Balcony == 0 && this.Updated29 == false) {
      this.credentials.Balcony = this.details.Balcony
    }
    if (this.credentials.ATM == 0 && this.Updated30 == false) {
      this.credentials.ATM = this.details.ATM
    }
    if (this.credentials.BeautySalon == 0 && this.Updated31 == false) {
      this.credentials.BeautySalon = this.details.BeautySalon
    }
    if (this.credentials.CStore == 0 && this.Updated32 == false) {
      this.credentials.CStore = this.details.CStore
    }
    if (this.credentials.Hairsalon == 0 && this.Updated33 == false) {
      this.credentials.Hairsalon = this.details.Hairsalon
    }
    if (this.credentials.Laundry == 0 && this.Updated34 == false) {
      this.credentials.Laundry = this.details.Laundry
    }
    if (this.credentials.Store == 0 && this.Updated35 == false) {
      this.credentials.Store = this.details.Store
    }
    if (this.credentials.Supermarket == 0 && this.Updated36 == false) {
      this.credentials.Supermarket = this.details.Supermarket
    }
    if (this.credentials.Blind == 0 && this.Updated37 == false) {
      this.credentials.Blind = this.details.Blind
    }
    if (this.credentials.Neareducation == 0 && this.Updated38 == false) {
      this.credentials.Neareducation = this.details.Neareducation
    }
    if (this.credentials.Cenmarket == 0 && this.Updated39 == false) {
      this.credentials.Cenmarket = this.details.Cenmarket
    }
    if (this.credentials.Market == 0 && this.Updated40 == false) {
      this.credentials.Market = this.details.Market
    }
    if (this.credentials.River == 0 && this.Updated41 == false) {
      this.credentials.River = this.details.River
    }
    if (this.credentials.Mainroad == 0 && this.Updated42 == false) {
      this.credentials.Mainroad = this.details.Mainroad
    }
    if (this.credentials.Insoi == 0 && this.Updated43 == false) {
      this.credentials.Insoi = this.details.Insoi
    }
    if (this.credentials.MFee == '') {
      this.credentials.MFee = this.details.MFee
    }
    if (this.credentials.LandAge == '') {
      this.credentials.LandAge = this.details.LandAge
    }
    if (this.credentials.PPStatus == '') {
      this.credentials.PPStatus = this.details.PPStatus
    }
    if (this.credentials.ImageEX == null) {
      this.credentials.ImageEX = this.details.ImageEX
    }
    if (this.credentials.Owner == '') {
      this.credentials.Owner = this.details.Owner
    }

    this.credentials.ID_Property = this.postID
    if (this.UpdatedS == true) {
      this.credentials.SellPrice = this.credentials.SellPrice.replace(/,/g, "")
    }
    if (this.UpdatedC == true) {
      this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/,/g, "")
    }
    if (this.UpdatedM == true) {
      this.credentials.MarketPrice = this.credentials.MarketPrice.replace(/,/g, "")
    }
    if (this.UpdatedZ == true) {
      this.getZipCode()
    }

    console.log(this.credentials)
    this.UserType.ID_Property = this.credentials.ID_Property
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    this.auth.EditHouse(this.credentials).subscribe(
      (result) => {
        if (!result.erorr) {
          alert(JSON.stringify(result))
         this.Phyton()
        } else {
          alert(JSON.stringify(result.erorr))
        }
      },
      err => {
        console.error(err)
      })
  }
  //************* Phyton *************
  Phyton() {
    console.log("************* Phyton *************")
    this.auth.PythonHouse(this.UserType).subscribe((result) => {
      console.log(result)
      console.log("************* Phyton  RESULT*************")
      this.router.navigate(['/houses', this.credentials.ID_Property]);
    },
      err => {
        console.error(err)
      })
  }

}

