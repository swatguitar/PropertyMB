import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { AuthenticationService, TokenPayload, locationsDetails } from '../../authentication.service'
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as $ from "jquery";
@Component({
  selector: 'app-addlands',
  templateUrl: './addlands.component.html',
  styleUrls: ['./addlands.component.css']
})

//comment555

export class AddlandsComponent {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  province: any[];
  amphur: any[];
  PA: locationsDetails;
  district: any[];
  zipcode: any[];
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  private geoCoder;
  public details: any;
  createID: string
  years: any[];
  onther: any
  Ronther: any
  cal: number
  back: string = "false"
  contactUser: any[];
  selectContact: any[];
  selectContact2: any[];
  selectContact3: any[];
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  constructor(private auth: AuthenticationService, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.addlandForm = new FormGroup({
      ColorType: new FormControl('', Validators.required),
      AnnounceTH: new FormControl('', Validators.required),
      SellPrice: new FormControl('', Validators.required),
      CodeDeed: new FormControl(''),
      Costestimate: new FormControl(''),
      CostestimateB: new FormControl(''),
      MarketPrice: new FormControl(''),
      CodeProperty: new FormControl(''),
      GroundValue: new FormControl(''),
      PriceWA: new FormControl(''),
      Land: new FormControl(''),
      Deed: new FormControl('', Validators.required),
      LandAge: new FormControl(''),
      Blind: new FormControl(''),
      Neareducation: new FormControl(''),
      Cenmarket: new FormControl(''),
      Market: new FormControl(''),
      River: new FormControl(''),
      Mainroad: new FormControl(''),
      Insoi: new FormControl(''),
      onther: new FormControl(''),
      Ronther: new FormControl(''),
      Letc: new FormControl(''),
      RoadWide: new FormControl(''),
      RoadType: new FormControl(''),
      GroundLevel: new FormControl(''),
      AsseStatus: new FormControl('', Validators.required),
      LandR: new FormControl('', Validators.required),
      LandG: new FormControl('', Validators.required),
      LandWA: new FormControl('', Validators.required),
    });
    this.EditContactForm = new FormGroup({
      ContactName: new FormControl('', Validators.required),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit: new FormControl(''),
      ContactS: new FormControl('', Validators.required),
    });
    this.EditContact2Form = new FormGroup({
      ContactName: new FormControl('', Validators.required),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit2: new FormControl(''),
      ContactSt: new FormControl('', Validators.required),
    });
    this.EditContact3Form = new FormGroup({
      ContactName: new FormControl('', Validators.required),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit3: new FormControl(''),
      ContactSo: new FormControl('', Validators.required),
    });
    this.CreateContactForm = new FormGroup({
      ContactName: new FormControl('', Validators.required),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
    });
  }

  credentials: TokenPayload = {
    ID_User: 0,
    Firstname: '',
    Lastname: '',
    Email: '',
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
    ContactU: 0,
    ContactS: '',
    ContactUo: 0,
    ContactSo: '',
    ContactUt: 0,
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
    ID_Contact: 0,
    ContactName: " ",
    ContactEmail: " ",
    ContactLine: " ",
    ContactPhone: " ",
  }
  addlandForm: FormGroup;
  EditContactForm: FormGroup;
  EditContact2Form: FormGroup;
  EditContact3Form: FormGroup;
  CreateContactForm: FormGroup;
  submitted = false;
  SellP: string


  ngOnInit() {
    this.setCurrentLocation();
    $('input.number').keyup(function (event) {

      // skip for arrow keys
      if (event.which >= 37 && event.which <= 40) return;

      // format number
      $(this).val(function (index, value) {
        return value
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          ;
      });
    });

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
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

    this.onResiveContact()
  }
  get f() { return this.addlandForm.controls; }

  calPWA() {
    //---------------calulate p/wa-----
    this.SellP = this.credentials.SellPrice.replace(/,/g, "");
    console.log(this.SellP)
    this.cal = parseInt(this.SellP) / parseInt(this.credentials.LandWA);
    this.credentials.PriceWA = this.cal.toString()
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

  onFinish() {
    this.auth.uploadftp().subscribe(() => {
    },
      err => {
        console.error(err)
      }
    )

  }
  get E() { return this.EditContactForm.controls; }
  get Et() { return this.EditContact2Form.controls; }
  get Eo() { return this.EditContact3Form.controls; }
  get C() { return this.CreateContactForm.controls; }
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
  Save: string = 'true'
  onCreateContact() {
    this.submitted = true;
    if (this.CreateContactForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }

    this.auth.addcontact(this.credentials).subscribe(() => {
      this.onResiveContact()
      this.Save = 'false'
      alert(JSON.stringify("บันทึกสำเร็จ"))
    },
      err => {
        console.error(err)
      }
    )
  }

  onEditContact() {
    this.submitted = true;
    if (this.EditContactForm.invalid) {
      return;
    }

    this.auth.EditContact(this.credentials).subscribe(() => {
    },
      err => {
        alert(JSON.stringify("บันทึกสำเร็จ"))
        this.onResiveContact()
        console.error(err)
      }
    )
  }
  onEditContactID(value) {
    this.credentials.ID_Contact = value
  }
  onEditContactName(value) {
    this.credentials.ContactName = value
  }
  onEditContactLine(value) {
    this.credentials.ContactLine = value
  }
  onEditContactPhone(value) {
    this.credentials.ContactPhone = value
  }
  onEditContactEmail(value) {
    this.credentials.ContactEmail = value
  }

  onGetContact(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactUt = value
    this.credentials.ContactUo = value
    this.selectContact = this.contactUser.filter(article => {
      return article.ID_Contact == value;
    });
  }
  onGetContact2(value) {
    this.credentials.ID_Contact = value
    this.credentials.ContactUo = value

    this.selectContact2 = this.contactUser.filter(article => {
      return article.ID_Contact == value;
    });
  }
  onGetContact3(value) {
    this.credentials.ID_Contact = value
    this.selectContact3 = this.contactUser.filter(article => {
      return article.ID_Contact == value;
    });
  }

  onGo() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addlandForm.invalid) {
      console.log(this.addlandForm)
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    this.onFirststep()
    alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
  }
  onUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addlandForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    this.getZipCode()
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    this.auth.EditLand(this.credentials).subscribe(
      () => {

      },
      err => {
        alert(JSON.stringify("อัพเดทข้อมูล สำเร็จ"))
        console.error(err)

      }

    )
  }
  onBack() {
    this.back = "true"

  }
  propType: string;
  IDprop: string;
  onFirststep() {
    this.back = "true"
    this.getZipCode()
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude

    this.onRandom()
    this.auth.getAllland().subscribe((land) => {
      this.details = land

      this.details.filter(article => {
        this.IDprop = article.ID_Lands
        console.log(this.IDprop + "----------------data")
        this.onCheckTwo()
      });
      console.log("..........." + this.credentials.ID_Lands + " END")

      this.auth.addland(this.credentials).subscribe(
        () => {

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





  }
  onSave() {

    this.router.navigateByUrl('/home')
  }
  onRandom() {
    var max = 9;
    var min = 0;
    var r = Math.floor(Math.random() * (max - min + 1) + min);
    var x = Math.floor(Math.random() * (max - min + 1) + min);
    var y = Math.floor(Math.random() * (max - min + 1) + min);
    var z = Math.floor(Math.random() * (max - min + 1) + min);
    this.createID = "l" + r + x + y + z;

  }
  loopChack() {
    this.onRandom()
    this.auth.getAllland().subscribe((land) => {
      this.details = land

      this.details.filter(article => {
        this.IDprop = article.ID_Lands
        console.log(this.IDprop + "-------data2222 ")
        this.onCheckTwo()
      });
    },
      err => {
        console.error(err)
      }
    )
  }
  onCheckTwo() {
    console.log(this.createID + "FIrst ")
    while (this.IDprop == this.createID) {
      this.loopChack()
    }
    this.credentials.ID_Lands = this.createID
    console.log(this.credentials.ID_Lands)


  }




}
