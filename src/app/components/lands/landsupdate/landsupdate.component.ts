import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { AuthenticationService, ID, TokenPayload, locationsDetails,PropertyH, PropertyDetails } from '../../../authentication.service'
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
  province: locationsDetails;
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  amphur: any[];
  PA: locationsDetails;
  district: locationsDetails;
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
  allowedit: string
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
    HouseArea: '',
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
  ID_user: string = (this.auth.getUserDetails().ID_User).toString()

  ngOnInit() {
    setTimeout(() => {
      
      //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
       this.setCurrentLocation();
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
     }, 1000);
     
     let params = this.route.snapshot.paramMap;
     if (params.has('id')) {
       this.postID = params.get('id');
     }
     this.SelectID.ID_Lands = this.postID;
     console.log( this.SelectID.ID_Lands)
       this.auth.landUpdate(this.SelectID).subscribe((land) => {
         this.results = land
         this.details = land
     
   
       },
         err => {
           console.error(err)
         })
 
     //-------------------------------------------------
     var year = new Date().getFullYear();
     var yearth = year + 543
     var range = [];
     range.push(yearth);
     for (var i = 1; i < 100; i++) {
       range.push(yearth - i);
 
     }
     this.years = range;
 
     //------------getlocation-------
     this.auth.getProvine().subscribe((province) => {
       this.province = province;
     },
       err => {
         console.error(err)
 
       }
     )
     setTimeout(() => { 
       this.results.forEach((element, index) => {
         this.cal = element.PriceWA
        this.credentials.SellPrice = element.SellPrice
        this.credentials.LandR = element.LandR
        this.credentials.LandG = element.LandG
        this.credentials.LandWA = element.LandWA

        console.log( this.cal)
      });
     
          //<<<---    using ()=> syntax
       this.onForeach()
       this.onSetcontact()
     }, 3000);
     setTimeout(() => {    //<<<---    using ()=> syntax
       this.recenter() 
     }, 5000);
     //-------- get contact ----
     this.auth.getContact().subscribe((contactUser) => {
       this.contactUser = contactUser;
     },
       err => {
         console.error(err)
       }
     )
  }

  CommaFormattedS(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (event.target.value) {
      event.target.value = event.target.value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedB(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (event.target.value) {
      event.target.value = event.target.value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedM(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
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

  onGo() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.EdithouseForm.invalid) {
      //console.log(this.addlandForm)
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if (this.con1selected == 'false'  && this.Name1 != '' && this.EDITED == true) {
      this.submitted = true;
      if (this.EditContactForm.invalid) {
        alert(JSON.stringify("กรุณากรอกข้อมูลติดต่อ"))
        return;
      }
      this.credentials.ContactName = this.conName1
      this.credentials.ContactPhone = this.conPhone1
      this.credentials.ContactEmail = this.conEmail1
      this.credentials.ContactLine = this.conLine1
      this.onRandomcontact()
      this.auth.getContact().subscribe((con) => {
        this.contactUser = con
        this.contactUser.filter(article => {
          this.IDcon = article.ID_Contact
          this.onCheckContact()
        });
        while (this.credentials.ContactU == '') {
          this.credentials.ContactU = this.credentials.ID_Contact
          this.onCheckContact()
         
        }
        //console.log(this.credentials.ContactU)
        this.auth.addcontact(this.credentials).subscribe(
          () => {

          },
          err => {
            console.error(err)
          }
        )
        if (this.con2selected == 'false' && this.Name2 != '' && this.EDITED == true) {
          this.credentials.ContactName = this.conName2
          this.credentials.ContactPhone = this.conPhone2
          this.credentials.ContactEmail = this.conEmail2
          this.credentials.ContactLine = this.conLine2
          this.onRandomcontact()
          this.auth.getContact().subscribe((con) => {
            this.contactUser = con
            this.contactUser.filter(article => {
              this.IDcon = article.ID_Contact
              this.onCheckContact()
            });
            while (this.credentials.ContactUt == '') {
              this.credentials.ContactUt = this.credentials.ID_Contact
              this.onCheckContact()
              //console.log(this.credentials.ContactU+"-***")
            }
            //console.log(this.credentials.ContactUt+"two")
            this.auth.addcontact(this.credentials).subscribe(
              () => {
              },
              err => {
                console.error(err)
              }
            )
            if (this.con3selected == 'false' && this.Name3 != '' && this.EDITED == true) {
              this.credentials.ContactName = this.conName3
              this.credentials.ContactPhone = this.conPhone3
              this.credentials.ContactEmail = this.conEmail3
              this.credentials.ContactLine = this.conLine3
              this.onRandomcontact()
              this.auth.getContact().subscribe((con) => {
                this.contactUser = con
                this.contactUser.filter(article => {
                  this.IDcon = article.ID_Contact
                  this.onCheckContact()
                });
                while (this.credentials.ContactUo == '') {
                  this.credentials.ContactUo = this.credentials.ID_Contact
                  this.onCheckContact()
                  //console.log(this.credentials.ContactU+"-***")
                }

               // console.log(this.credentials.ContactUo+"three")
                 this.auth.addcontact(this.credentials).subscribe(
                   () => {
                     this.onUpdate()
                   },
                   err => {
                     console.error(err)
                   }
                 )
              },
                err => {
                  console.error(err)
                }
              )

            } else if (this.con2selected == 'false' && this.Name3 == '' && this.EDITED == true)  {
              this.credentials.ContactUo = this.credentials.ID_Contact
              // stop here if form is invalid
              if (this.EdithouseForm.invalid) {
                return;
              }
              this.onUpdate()
            }else {
              // stop here if form is invalid
               if (this.EdithouseForm.invalid) {
                 console.log(this.EdithouseForm)
                 return;
               }
              this.onUpdate()
            }
          },
            err => {
              console.error(err)
            }
          )


        } else if (this.con2selected == 'false' && this.Name2 == ''  && this.EDITED == true)  {
          this.credentials.ContactUt = this.credentials.ID_Contact
          this.credentials.ContactUo = this.credentials.ID_Contact
          // stop here if form is invalid
           if (this.EdithouseForm.invalid) {
             return;
           }
          this.onUpdate()
        }else {
          // stop here if form is invalid
           if (this.EdithouseForm.invalid) {
             //console.log(this.addlandForm)
             alert(JSON.stringify("กรุณากรอกข้อมูล"))
             return;
           }
          this.onUpdate()
        }
      },
        err => {
          console.error(err)
        }
      )


    } else if (this.con2selected == 'false' && this.Name2 != ''  && this.EDITED == true) {
      this.credentials.ContactName = this.conName2
      this.credentials.ContactPhone = this.conPhone2
      this.credentials.ContactEmail = this.conEmail2
      this.credentials.ContactLine = this.conLine2

      this.onRandomcontact()
      this.auth.getContact().subscribe((con) => {
        this.contactUser = con
        this.contactUser.filter(article => {
          this.IDcon = article.ID_Contact
          this.onCheckContact()
          //console.log(this.IDcon + "----------------data")
        });
        while (this.credentials.ContactUt == '') {
          this.credentials.ContactUt = this.credentials.ID_Contact
          this.onCheckContact()
          //console.log(this.credentials.ContactU+"-***")
        }
        //console.log(this.credentials.ContactUt + " two R")
        this.auth.addcontact(this.credentials).subscribe(
          () => {
          },
          err => {
            console.error(err)
          }
        )
        if (this.con3selected == 'false' && this.Name3 != ''  && this.EDITED == true) {
          this.credentials.ContactName = this.conName3
          this.credentials.ContactPhone = this.conPhone3
          this.credentials.ContactEmail = this.conEmail3
          this.credentials.ContactLine = this.conLine3
          //console.log(this.credentials.ContactName + "" + this.credentials.ContactPhone + "" + this.credentials.ContactEmail + "" + this.credentials.ContactLine + " three")
          this.onRandomcontact()
          this.auth.getContact().subscribe((con) => {
            this.contactUser = con
            this.contactUser.filter(article => {
              this.IDcon = article.ID_Contact
              //console.log(this.IDcon + "----------------data")
              this.onCheckContact()
            });
            while (this.credentials.ContactUo == '') {
              this.credentials.ContactUo = this.credentials.ID_Contact
              this.onCheckContact()
              //console.log(this.credentials.ContactU+"-***")
            }
            //console.log(this.credentials.ContactUo + " three")
            this.auth.addcontact(this.credentials).subscribe(
              () => {
                this.onUpdate()

              },
              err => {
                console.error(err)
              }
            )
          },
            err => {
              console.error(err)
            }
          )

        } else if (this.con2selected == 'false' && this.Name3 == ''  && this.EDITED == true)  {
          this.credentials.ContactUo = this.credentials.ID_Contact
          // stop here if form is invalid
           if (this.EdithouseForm.invalid) {
             //console.log(this.addlandForm)
             alert(JSON.stringify("กรุณากรอกข้อมูล"))
             return;
           }
          this.onUpdate()
        }else {
          // stop here if form is invalid
           if (this.EdithouseForm.invalid) {
             console.log(this.EdithouseForm)
             alert(JSON.stringify("กรุณากรอกข้อมูล"))
             return;
           }
          this.onUpdate()
       
        }
        
      },
        err => {
          console.error(err)
        }
      )


    } else if (this.con3selected == 'false' && this.Name3 != ''  && this.EDITED == true) {
      this.credentials.ContactName = this.conName3
      this.credentials.ContactPhone = this.conPhone3
      this.credentials.ContactEmail = this.conEmail3
      this.credentials.ContactLine = this.conLine3
      //console.log(this.credentials.ContactName + "" + this.credentials.ContactPhone + "" + this.credentials.ContactEmail + "" + this.credentials.ContactLine + " three")
      this.onRandomcontact()
      this.auth.getContact().subscribe((con) => {
        this.contactUser = con
        this.contactUser.filter(article => {
          this.IDcon = article.ID_Contact
          //console.log(this.IDcon + "----------------data")
          this.onCheckContact()
        });
        while (this.credentials.ContactUo == '') {
          this.credentials.ContactUo = this.credentials.ID_Contact
          this.onCheckContact()
        }
        //console.log(this.credentials.ContactUo + " three")

        this.auth.addcontact(this.credentials).subscribe(
          () => {
            this.onUpdate()
        
          },
          err => {
            console.error(err)
          }
        )
      },
        err => {
          console.error(err)
        }
      )

    } else {
      // stop here if form is invalid
       if (this.EdithouseForm.invalid) {
         //console.log(this.addlandForm)
         alert(JSON.stringify("กรุณากรอกข้อมูล"))
         return;
       }
      this.onUpdate()
    
    }
  }
   //*****chack ID Contact */
   onRandomcontact() {
    var max = 9;
    var min = 0;
    var r = Math.floor(Math.random() * (max - min + 1) + min);
    var x = Math.floor(Math.random() * (max - min + 1) + min);
    var y = Math.floor(Math.random() * (max - min + 1) + min);
    var z = Math.floor(Math.random() * (max - min + 1) + min);
    this.ContactID = this.ID_user + r + x + y + z;

  }

  loopChackcontact() {
    this.onRandomcontact()
    this.auth.getContact().subscribe((contactUser) => {
      this.contactUser = contactUser;

      this.contactUser.filter(article => {
        this.IDcon = article.ID_Contact
        // console.log(this.IDcon + "-------Contact222 ")
        this.onCheckContact()
      });
    },
      err => {
        console.error(err)
      }
    )
  }
  onCheckContact() {
    //console.log(this.ContactID + "FIrst ")
    while (this.IDcon == this.ContactID) {
      this.loopChackcontact()
    }
    this.credentials.ID_Contact = this.ContactID
    console.log(this.credentials.ID_Contact)
  }

  get f() { return this.EdithouseForm.controls; }
  get E() { return this.EditContactForm.controls; }
  get Et() { return this.EditContact2Form.controls; }
  get Eo() { return this.EditContact3Form.controls; }
  get C() { return this.CreateContactForm.controls; }

  recenter(){
    this.latitude = 13.7348534;
    this.longitude = 100.4997134999999;

    setTimeout(()=>{
      
        this.latitude = Number(this.latnew)
        this.longitude  = Number(this.lonnew)
       this.zoom = 15
       this.selectContact.forEach((element, index) => {
        this.Name1 = element.Name
        this.conEmail1 = element.Email
        this.conPhone1 = element.Phone
        this.conLine1 = element.Line
        this.conID1 = element.ID_Contact
      });
      this.selectContact2.forEach((element, index) => {
        this.Name2 = element.Name
        this.conEmail2 = element.Email
        this.conPhone2 = element.Phone
        this.conLine2 = element.Line
        this.conID2 = element.ID_Contact
      });
      this.selectContact3.forEach((element, index) => {
        this.Name3 = element.Name
        this.conEmail3 = element.Email
        this.conPhone3 = element.Phone
        this.conLine3 = element.Line
        this.conID3 = element.ID_Contact
      });
      
    },3000);
    }
  
  onForeach() {
    this.results.forEach((element, index) => {
      this.latnew = element.Latitude
      this.lonnew = element.Longitude
      this.lat = element.Latitude
      this.lng = element.Longitude
      this.conS1 = element.ContactS
      this.conS2 = element.ContactSt
      this.conS3 = element.ContactSo
      this.IDcontact1 = element.ContactU
      this.IDcontact2 = element.ContactUt
      this.IDcontact3 = element.ContactUo
      console.log(this.conS1)
    });
  

  }
  onSetcontact() {
    this.selectContact = this.contactUser.filter(article => {
      return article.ID_Contact == this.IDcontact1;
    });
    this.selectContact2 = this.contactUser.filter(article => {
      return article.ID_Contact == this.IDcontact2;
    });
    this.selectContact3 = this.contactUser.filter(article => {
      return article.ID_Contact == this.IDcontact3;
    });
  }
  // Get Current Location Coordinates
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
  selectprovince(data) {
    this.credentials.LProvince = data.PROVINCE_NAME
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
    this.credentials.LAmphur = data.AMPHUR_NAME
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
    this.credentials.LDistrict = data.DISTRICT_NAME
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
  getZipCode() {
    this.zipcode.forEach((element, index) => {
      this.credentials.LZipCode = element.ZIPCODE
    });

  }
  onResiveContact() {
    //-------- get contact ----
    this.auth.getContact().subscribe((contactUser) => {
      this.contactUser = contactUser;
    },
      err => {
        console.error(err)
      }
    )
  }
  onEditContact1() {

    this.auth.EditContact(this.credentials).subscribe(() => {
    },
      err => {
        alert(JSON.stringify("บันทึกสำเร็จ"))
        this.onResiveContact()
        console.error(err)
      }
    )
  }
  onEditContact2() {
    this.auth.EditContact(this.credentials).subscribe(() => {
    },
      err => {
        alert(JSON.stringify("บันทึกสำเร็จ"))
        this.onResiveContact()
        console.error(err)
      }
    )
  }
  onEditContact3() {
    this.auth.EditContact(this.credentials).subscribe(() => {
    },
      err => {
        alert(JSON.stringify("บันทึกสำเร็จ"))
        this.onResiveContact()
        console.error(err)
      }
    )
  }

  onGetContact(item) {
    this.con1selected = 'true'
    console.log(this.credentials.ContactName)
    this.conID1 = item.ID_Contact
    this.conName1 = item.Name
    this.conEmail1 = item.Email
    this.conPhone1 = item.Phone
    this.conLine1 = item.Line
    this.credentials.ContactU = item.ID_Contact
  }
  onGetContact2(item) {
    this.con2selected = 'true'
    console.log(this.credentials.ContactName)
    this.conID2 = item.ID_Contact
    this.conName2 = item.Name
    this.conEmail2 = item.Email
    this.conPhone2 = item.Phone
    this.conLine2 = item.Line
    this.credentials.ContactUt = item.ID_Contact
  }
  onGetContact3(item) {
    this.con3selected = 'true'
    console.log(this.credentials.ContactName)
    this.conID3 = item.ID_Contact
    this.conName3 = item.Name
    this.conEmail3 = item.Email
    this.conPhone3 = item.Phone
    this.conLine3 = item.Line
    this.credentials.ContactUo = item.ID_Contact
  }

  onFocused(e) {
    // do something when input is focused
  }
  onEditContactID1(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactName = this.conName1
    this.credentials.ContactPhone = this.conPhone1
    this.credentials.ContactEmail = this.conEmail1
    this.credentials.ContactLine = this.conLine1
  }
  onEditContactName1(value: string) {
    this.EDITED = true
   console.log(this.EDITED )
    this.conName1 = value
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

  onEditContactID2(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactName = this.conName2
    this.credentials.ContactPhone = this.conPhone2
    this.credentials.ContactEmail = this.conEmail2
    this.credentials.ContactLine = this.conLine2
  }
  onEditContactName2(value: string) {
    this.EDITED = true
    this.conName2 = value
  }
  onEditContactLine2(value) {
    this.conLine2 = value
  }
  onEditContactPhone2(value) {
    this.conPhone2 = value
  }
  onEditContactEmail2(value) {
    this.conEmail2 = value
  }


  onEditContactID3(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactName = this.conName3
    this.credentials.ContactPhone = this.conPhone3
    this.credentials.ContactEmail = this.conEmail3
    this.credentials.ContactLine = this.conLine3
  }
  onEditContactName3(value: string) {
    this.EDITED = true
    this.conName3 = value
  }
  onEditContactLine3(value) {
    this.conLine3 = value
  }
  onEditContactPhone3(value) {
    this.conPhone3 = value
  }
  onEditContactEmail3(value) {
    this.conEmail3 = value
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
  calPWA() {
    //---------------calulate p/wa-----
    this.SellP = this.credentials.SellPrice
   
  
    this.cal = parseInt(this.SellP) / ((parseInt(this.credentials.LandR) * 400) + (parseInt(this.credentials.LandG) * 100) + parseInt(this.credentials.LandWA));
    this.credentials.PriceWA = this.cal.toString()
    console.log( this.cal)
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
    if(value == true){
      this.credentials.Blind = 1
    }else{
      this.credentials.Blind = 0
    }
  }
  Neareducation(value) {
    this.Updated38 = true
    if(value == true){
      this.credentials.Neareducation = 1
    }else{
      this.credentials.Neareducation = 0
    }
  }
  Cenmarket(value) {
    this.Updated39 = true
    if(value == true){
      this.credentials.Cenmarket = 1
    }else{
      this.credentials.Cenmarket = 0
    }
  }
  Market(value) {
    this.Updated40 = true
    if(value == true){
      this.credentials.Market = 1
    }else{
      this.credentials.Market = 0
    }
  }
  River(value) {
    this.Updated41 = true
    if(value == true){
      this.credentials.River = 1
    }else{
      this.credentials.River = 0
    }
  }
  Mainroad(value) {
    this.Updated42 = true
    if(value == true){
      this.credentials.Mainroad = 1
    }else{
      this.credentials.Mainroad = 0
    } 
  }
  Insoi(value) {
    this.Updated43 = true
    //-----------
    if(value == true){
      this.credentials.Insoi = 1
    }else{
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
  CodeProperty(value){
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

  onUpdate(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.EdithouseForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if(this.credentials.ColorType == ''){
      this.credentials.ColorType = this.details.ColorType
    }
    if(this.credentials.AnnounceTH == ''){
      this.credentials.AnnounceTH = this.details.AnnounceTH
    }
    if(this.credentials.CodeDeed == ''){
      this.credentials.CodeDeed = this.details.CodeDeed
    }
    if(this.credentials.PriceWA == ''){
      this.credentials.PriceWA = this.details.PriceWA
    }
    if(this.credentials.SellPrice == ''){
      this.credentials.SellPrice = this.details.SellPrice
    }
    if(this.credentials.Costestimate == ''){
      this.credentials.Costestimate = this.details.Costestimate
    }
    if(this.credentials.CostestimateB == ''){
      this.credentials.CostestimateB = this.details.CostestimateB
    }
    if(this.credentials.MarketPrice == ''){
      this.credentials.MarketPrice = this.details.MarketPrice
    }
    if(this.credentials.BathRoom == ''){
      this.credentials.BathRoom = this.details.BathRoom
    }
    if(this.credentials.BedRoom == ''){
      this.credentials.BedRoom = this.details.BedRoom
    }
    if(this.credentials.CarPark == ''){
      this.credentials.CarPark = this.details.CarPark
    }
    if(this.credentials.HouseArea == ''){
      this.credentials.HouseArea = this.details.HouseArea
    }
    if(this.credentials.Land == ''){
      this.credentials.Land = this.details.Land
    }
    if(this.credentials.LandR == ''){
      this.credentials.LandR = this.details.LandR
    }
    if(this.credentials.LandG == ''){
      this.credentials.LandG = this.details.LandG
    }
    if(this.credentials.LandWA == ''){
      this.credentials.LandWA = this.details.LandWA
    }
    if(this.credentials.LandU == ''){
      this.credentials.LandU = this.details.LandU
    }
    if(this.credentials.Deed == ''){
      this.credentials.Deed = this.details.Deed
    }
    if(this.credentials.CodeProperty == ''){
      this.credentials.CodeProperty = this.details.CodeProperty
    }
    if(this.credentials.HomeCondition == ''){
      this.credentials.HomeCondition = this.details.HomeCondition
    }
    if(this.credentials.BuildingAge == ''){
      this.credentials.BuildingAge = this.details.BuildingAge
    }
    if(this.credentials.BuildFD == ''){
      this.credentials.BuildFD = this.details.BuildFD
    }
    if(this.credentials.BuildFM == ''){
      this.credentials.BuildFM = this.details.BuildFM
    }
    if(this.credentials.BuildFY == ''){
      this.credentials.BuildFY = this.details.BuildFY
    }
    if(this.credentials.Directions == ''){
      this.credentials.Directions = this.details.Directions
    }
    if(this.credentials.RoadType == ''){
      this.credentials.RoadType = this.details.RoadType
    }
    if(this.credentials.RoadWide == ''){
      this.credentials.RoadWide = this.details.RoadWide
    }
    if(this.credentials.GroundLevel == ''){
      this.credentials.GroundLevel = this.details.GroundLevel
    }
    if(this.credentials.GroundValue == ''){
      this.credentials.GroundValue = this.details.GroundValue
    }
    if(this.credentials.MoreDetails == ''){
      this.credentials.MoreDetails = this.details.MoreDetails
    }
    if(this.credentials.Latitude == 0){
      this.credentials.Latitude = this.details.Latitude
    }
    if(this.credentials.Longitude == 0){
      this.credentials.Longitude = this.details.Longitude
    }
    if(this.credentials.AsseStatus == ''){
      this.credentials.AsseStatus = this.details.AsseStatus
    }
    if(this.credentials.ObservationPoint == ''){
      this.credentials.ObservationPoint = this.details.ObservationPoint
    }
    if(this.credentials.Location == ''){
      this.credentials.Location = this.details.Location
    }
    if(this.credentials.LProvince == ''){
      this.credentials.LProvince = this.details.LProvince
    }
    if(this.credentials.LAmphur == ''){
      this.credentials.LAmphur = this.details.LAmphur
    }
    if(this.credentials.LDistrict == ''){
      this.credentials.LDistrict = this.details.LDistrict
    }
    if(this.credentials.LZipCode == ''){
      this.credentials.LZipCode = this.details.LZipCode
    }
    if(this.credentials.ContactU == ''){
      this.credentials.ContactU = this.details.ContactU
    }
    if(this.credentials.ContactS == ''){
      this.credentials.ContactS = this.details.ContactS
    }
    if(this.credentials.ContactUo == ''){
      this.credentials.ContactUo = this.details.ContactUo
    }
    if(this.credentials.ContactSo == ''){
      this.credentials.ContactSo = this.details.ContactSo
    }
    if(this.credentials.ContactUt == ''){
      this.credentials.ContactUt = this.details.ContactUt
    }
    if(this.credentials.ContactSt == ''){
      this.credentials.ContactSt = this.details.ContactSt
    }
    if(this.credentials.ContactSt == ''){
      this.credentials.ContactSt = this.details.ContactSt
    }
    if(this.credentials.Blind == 0 && this.Updated37 == false){
      this.credentials.Blind = this.details.Blind
    }
    if(this.credentials.Neareducation == 0 && this.Updated38 == false){
      this.credentials.Neareducation = this.details.Neareducation
    }
    if(this.credentials.Cenmarket == 0 && this.Updated39 == false){
      this.credentials.Cenmarket = this.details.Cenmarket
    }
    if(this.credentials.Market == 0 && this.Updated40 == false){
      this.credentials.Market = this.details.Market
    }
    if(this.credentials.River == 0 && this.Updated41 == false){
      this.credentials.River = this.details.River
    }
    if(this.credentials.Mainroad == 0 && this.Updated42 == false){
      this.credentials.Mainroad = this.details.Mainroad
    }
    if(this.credentials.Insoi == 0 && this.Updated43 == false){
      this.credentials.Insoi = this.details.Insoi
    }
    if(this.credentials.MFee == ''){
      this.credentials.MFee = this.details.MFee
    }
    if(this.credentials.LandAge == ''){
      this.credentials.LandAge = this.details.LandAge
    }
    if(this.credentials.PPStatus == ''){
      this.credentials.PPStatus = this.details.PPStatus
    }
    if(this.credentials.ImageEX == null){
      this.credentials.ImageEX = this.details.ImageEX
    }
    if(this.credentials.Owner == ''){
      this.credentials.Owner = this.details.Owner
    }

    
    
   
  
   this.credentials.ID_Lands = this.postID
   if(this.UpdatedS == true){
    this.credentials.SellPrice = this.credentials.SellPrice.replace(/,/g, "")
   }
   if(this.UpdatedC == true){
    this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/,/g, "")
   } 
   if(this.UpdatedMB == true){
    this.credentials.Costestimate = this.credentials.Costestimate.replace(/,/g, "")
   }
   if(this.UpdatedM == true){
    this.credentials.MarketPrice = this.credentials.MarketPrice.replace(/,/g, "")
   }
   if(this.UpdatedZ == true){
    this.getZipCode()
   }
   
  
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    this.auth.EditLand(this.credentials).subscribe(
      () => {

      },
      err => {
   
        alert(JSON.stringify("อัพเดทข้อมูล สำเร็จ"))
        this.router.navigate(['/lands',this.credentials.ID_Lands]);
        console.error(err)

      }

    )
  }

}
