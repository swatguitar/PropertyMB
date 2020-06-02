import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, ID, TokenPayload, locationsDetails, PropertyH, PropertyDetails, Location,UserType } from '../../../authentication.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-landsupdate',
  templateUrl: './landsupdate.component.html',
  styleUrls: ['./landsupdate.component.css']
})
export class LandsupdateComponent implements OnInit {
  public postID: string;
  public activePage: number;
  results: PropertyDetails[];
  details: PropertyDetails;
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
  UpdatedMB: boolean = false;
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
  SellP: string;
  cal: any;
  UpdatedZ: boolean;
  zipcodeOld: any[];
  showSpinner: boolean;
  SelectContact: boolean  = true;
  EditC: boolean  = false;
  reset: boolean  = false; 


  constructor(private auth: AuthenticationService, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private route: ActivatedRoute) {
    this.EdithouseForm = new FormGroup({
      ColorType: new FormControl(''),
      AnnounceTH: new FormControl(''),
      SellPrice: new FormControl(''),
      CodeDeed: new FormControl(''),
      Costestimate: new FormControl(''),
      MarketPrice: new FormControl(''),
      HouseArea: new FormControl(''),
      LandAge: new FormControl(''),
      RoadWide: new FormControl(''),
      Deed: new FormControl(''),
      GroundLevel: new FormControl(''),
      GroundValue: new FormControl(''),
      RoadType: new FormControl(''),
      CodeProperty: new FormControl(''),
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
  allowedit: boolean  = false
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
    ContactU: '',
    ContactUo: '',
    ContactUt: '',
    PPStatus: '',
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

  get f() { return this.EdithouseForm.controls; }
  get E() { return this.EditContactForm.controls; }
  get Et() { return this.EditContact2Form.controls; }
  get Eo() { return this.EditContact3Form.controls; }
  get C() { return this.CreateContactForm.controls; }

  
  onGo() {
    this.submitted = true;
    if (this.EdithouseForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if (this.SelectContact == false && this.Name1 != '') {//***************************************IF contact 1 not select */
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

   //************* Check "," and number *************
  CommaFormattedS(event) {
    if (event.which >= 37 && event.which <= 40) return;
    if (event.target.value) {
      event.target.value = event.target.value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedB(event) {
    if (event.which >= 37 && event.which <= 40) return;
    if (event.target.value) {
      event.target.value = event.target.value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedM(event) {
    if (event.which >= 37 && event.which <= 40) return;
    if (event.target.value) {
      event.target.value = event.target.value.replace(/\D/g, "")
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
    
    this.zipcodeOld = []
    this.showSpinner = true
    //************* แบ่งหน้า ************* 
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.postID = params.get('id');
    }
    this.SelectID.ID_Lands = this.postID;
    console.log(this.SelectID.ID_Lands)
    this.GetProvince()
    this.GetLand()
    this.LoadMap()
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

  //************* Get Land by id Land *************
  GetLand(){
    this.auth.landUpdate(this.SelectID).subscribe((land) => {
      if(land){
        this.results = land
        this.details = land
        this.SelectID.ContactU = land[0].ContactU
        this.SelectID.ContactUt = land[0].ContactUt
        this.SelectID.ContactUo = land[0].ContactUo
        this.conS1 = land[0].ContactS
        this.conS2 = land[0].ContactSt
        this.conS3 = land[0].ContactSo
        this.latitude = Number(land[0].Latitude)
        this.longitude = Number(land[0].Longitude)
        this.cal = land[0].PriceWA
        this.zoom = 15
        this.zipcodeOld.push(land[0].LZipCode)
        this.credentials.SellPrice = land[0].SellPrice
        this.credentials.LandR = land[0].LandR
        this.credentials.LandG = land[0].LandG
        this.credentials.LandWA = land[0].LandWA
        this.getContact()
        this.showSpinner = false
      }
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

  //************* get ADDRESS  *************
  PROVINCE_NAME: string
  selectprovince(data) {
    this.credentials.LProvince = data.PROVINCE_NAME
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
      console.log("SelectContactB :"+this.SelectContact)
      console.log("alloweditB :"+this.allowedit)
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

  onGetAnnounceTH(value) {
    this.credentials.AnnounceTH = value
  }
  ColorType(value) {
    this.credentials.ColorType = value
  }
  onGetCodeDeed(value) {
    this.credentials.CodeDeed = value
  }
  Deed(value) {
    this.credentials.Deed = value
  }
  onGetSell(value) {
    this.UpdatedS = true;
    this.credentials.SellPrice = value.replace(/,/g, "");
    this.calPWA()
  }
  onGetSellB(value) {
    this.UpdatedC = true;
    this.credentials.CostestimateB = value
  }
  onGetSellMB(value) {
    this.UpdatedMB = true;
    this.credentials.MarketPrice = value
  }
  onGetSellM(value) {
    this.UpdatedM = true;
    this.credentials.MarketPrice = value
  }

  //************* Calculate PriceWA *************
  calPWA() {
  
    if(this.credentials.SellPrice ==""){
      this.credentials.SellPrice ="0"
    }
    if(this.credentials.LandR ==""){
      this.credentials.LandR ="0"
    }
    if(this.credentials.LandG ==""){
      this.credentials.LandG ="0"
    }
    if(this.credentials.LandWA ==""){
      this.credentials.LandWA ="0"
    }
    this.SellP = this.credentials.SellPrice
    this.cal = parseInt(this.SellP) / ((parseInt(this.credentials.LandR) * 400) + (parseInt(this.credentials.LandG) * 100) + parseInt(this.credentials.LandWA));
    this.credentials.PriceWA = this.cal.toString()

  }

  onGetAsseStatus(value) {
    this.credentials.AsseStatus = value
    console.log(this.credentials.AsseStatus)
  }
  LandAge(value) {
    this.credentials.LandAge = value
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
    this.calPWA()
  }
  onGetLandG(value) {

    this.credentials.LandG = value
    this.calPWA()
  }
  CodeProperty(value) {
    this.credentials.CodeProperty = value
  }
  onGetLandWA(value) {

    this.credentials.LandWA = value
    this.calPWA()
  }
  onGetLand(value) {
    this.credentials.Land = value
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
    if (this.EdithouseForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if (this.credentials.ColorType == '') {
      this.credentials.ColorType = this.details.ColorType
    }
    if (this.credentials.AnnounceTH == '') {
      this.credentials.AnnounceTH = this.details.AnnounceTH
    }
    if (this.credentials.CodeDeed == '') {
      this.credentials.CodeDeed = this.details.CodeDeed
    }
    if (this.credentials.PriceWA == '') {
      this.credentials.PriceWA = this.details.PriceWA
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
    if (this.credentials.Land == '') {
      this.credentials.Land = this.details.Land
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
    if (this.credentials.Deed == '') {
      this.credentials.Deed = this.details.Deed
    }
    if (this.credentials.CodeProperty == '') {
      this.credentials.CodeProperty = this.details.CodeProperty
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
    this.credentials.ID_Lands = this.postID
    if (this.UpdatedS == true) {
      this.credentials.SellPrice = this.credentials.SellPrice.replace(/,/g, "")
    }
    if (this.UpdatedC == true) {
      this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/,/g, "")
    }
    if (this.UpdatedMB == true) {
      this.credentials.Costestimate = this.credentials.Costestimate.replace(/,/g, "")
    }
    if (this.UpdatedM == true) {
      this.credentials.MarketPrice = this.credentials.MarketPrice.replace(/,/g, "")
    }
    if (this.UpdatedZ == true) {
      this.getZipCode()
    }


    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    this.UserType.ID_Lands = this.credentials.ID_Lands
    this.auth.EditLand(this.credentials).subscribe(
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
      }

    )
  }
  //************* Phyton *************
  Phyton() {
    console.log("************* Phyton *************")
    this.auth.PythonLand(this.UserType).subscribe((result) => {
      console.log(result)
      console.log("************* Phyton  RESULT*************")
      this.router.navigate(['/lands', this.credentials.ID_Lands]);
    },
      err => {
        console.error(err)
      })
  }
}
