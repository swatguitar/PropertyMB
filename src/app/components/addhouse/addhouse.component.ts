import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { } from 'googlemaps';
import { AuthenticationService, TokenPayload, locationsDetails } from '../../authentication.service'
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as $ from "jquery";




@Component({
  selector: 'app-addhouse',
  templateUrl: './addhouse.component.html',
  styleUrls: ['./addhouse.component.css'],

})

export class AddhouseComponent implements OnInit {

  addhouseForm: FormGroup;
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
  IDcon: any;
  ContactID: string;
  constructor(private auth: AuthenticationService, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.addhouseForm = new FormGroup({
      PropertyType: new FormControl('', Validators.required),
      AnnounceTH: new FormControl('', Validators.required),
      SellPrice: new FormControl('', Validators.required),
      CodeDeed: new FormControl(''),
      Costestimate: new FormControl(''),
      MarketPrice: new FormControl(''),
      HouseArea: new FormControl('', Validators.required),
      BathRoom: new FormControl('', Validators.required),
      BedRoom: new FormControl('', Validators.required),
      CarPark: new FormControl('', Validators.required),
      Floor: new FormControl('', Validators.required),
      MFee: new FormControl(''),
      HomeCondition: new FormControl(''),
      BuildFD: new FormControl(''),
      BuildFM: new FormControl(''),
      BuildFY: new FormControl('', Validators.required),
      AsseStatus: new FormControl('', Validators.required),
      BuildingAge: new FormControl(''),
      Directions: new FormControl('', Validators.required),
      LandR: new FormControl(''),
      LandG: new FormControl(''),
      LandWA: new FormControl(''),
      Location: new FormControl(''),
      Lprovince: new FormControl('', Validators.required),
      Lamphur: new FormControl('', Validators.required),
      Ldistrict: new FormControl('', Validators.required),
      ZIPCODE: new FormControl(''),
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
      ContactSt: new FormControl(''),
    });
    this.EditContact3Form = new FormGroup({
      ContactName: new FormControl('', Validators.required),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
      allowedit3: new FormControl(''),
      ContactSo: new FormControl(''),
    });
    this.CreateContactForm = new FormGroup({
      ContactName: new FormControl('', Validators.required),
      ContactLine: new FormControl(''),
      ContactEmail: new FormControl(''),
      ContactPhone: new FormControl(''),
    });
  }

  zoom: number = 5;
  latitude: number;
  longitude: number;
  NextstepCon: boolean = false
  address: string;
  province: locationsDetails[];
  Lprovince: any[];
  Ldistrict: any[];
  Lamphur: any[];
  amphur: any[];
  PA: locationsDetails;
  district: locationsDetails[];
  zipcode: any[];
  private geoCoder;
  public details: any;
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
  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
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
  CommaFormattedS(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.credentials.SellPrice) {
      this.credentials.SellPrice = this.credentials.SellPrice.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedB(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.credentials.CostestimateB) {
      this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  CommaFormattedM(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
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
      this.province.sort((a, b) => a.PROVINCE_NAME.localeCompare(b.PROVINCE_NAME));
    },
      err => {
        console.error(err)

      }
    )
    this.onResiveContact()
  }

  get f() { return this.addhouseForm.controls; }
  get E() { return this.EditContactForm.controls; }
  get Et() { return this.EditContact2Form.controls; }
  get Eo() { return this.EditContact3Form.controls; }
  get C() { return this.CreateContactForm.controls; }

  onGo() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.addhouseForm.invalid) {
      //console.log(this.addlandForm)
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    if (this.con1selected == 'false') {
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
        // console.log(this.credentials.ContactU+"--------")

        this.auth.addcontact(this.credentials).subscribe(
          () => {

          },
          err => {
            console.error(err)
          }
        )
        if (this.con2selected == 'false' && this.Name2 != '') {
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

            console.log(this.credentials.ContactUt + "two")
            this.auth.addcontact(this.credentials).subscribe(
              () => {
              },
              err => {
                console.error(err)
              }
            )
            if (this.con3selected == 'false' && this.Name3 != '') {
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

                console.log(this.credentials.ContactUo + "three")
                this.auth.addcontact(this.credentials).subscribe(
                  () => {
                    this.onFirststep()
                    alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
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

            } else if (this.con2selected == 'false' && this.Name3 == '') {
              this.credentials.ContactUo = this.credentials.ID_Contact
              // stop here if form is invalid
              if (this.addhouseForm.invalid) {
                alert(JSON.stringify("กรุณากรอกข้อมูล"))
                return;
              }
              this.onFirststep()
              alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
            } else {
              // stop here if form is invalid
              if (this.addhouseForm.invalid) {
                console.log(this.addhouseForm)
                alert(JSON.stringify("กรุณากรอกข้อมูล"))
                return;
              }
              this.onFirststep()
              alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
            }
          },
            err => {
              console.error(err)
            }
          )


        } else if (this.con2selected == 'false' && this.Name2 == '') {
          this.credentials.ContactUt = this.credentials.ID_Contact
          this.credentials.ContactUo = this.credentials.ID_Contact
          // stop here if form is invalid
          if (this.addhouseForm.invalid) {
            alert(JSON.stringify("กรุณากรอกข้อมูล"))
            return;
          }
          this.onFirststep()
          alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
        } else {
          // stop here if form is invalid
          if (this.addhouseForm.invalid) {
            //console.log(this.addlandForm)
            alert(JSON.stringify("กรุณากรอกข้อมูล"))
            return;
          }
          this.onFirststep()
          alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
        }
      },
        err => {
          console.error(err)
        }
      )


    } else if (this.con2selected == 'false' && this.Name2 != '') {
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
        if (this.con3selected == 'false' && this.Name3 != '') {
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
                this.onFirststep()
                alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
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

        } else if (this.con2selected == 'false' && this.Name3 == '') {
          this.credentials.ContactUo = this.credentials.ID_Contact
          // stop here if form is invalid
          if (this.addhouseForm.invalid) {
            //console.log(this.addlandForm)
            alert(JSON.stringify("กรุณากรอกข้อมูล"))
            return;
          }
          this.onFirststep()
          alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
        } else {
          // stop here if form is invalid
          if (this.addhouseForm.invalid) {
            console.log(this.addhouseForm)
            alert(JSON.stringify("กรุณากรอกข้อมูล"))
            return;
          }
          this.onFirststep()
          alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
        }

      },
        err => {
          console.error(err)
        }
      )


    } else if (this.con3selected == 'false' && this.Name3 != '') {
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
            this.onFirststep()
            alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
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
      if (this.addhouseForm.invalid) {
        //console.log(this.addlandForm)
        alert(JSON.stringify("กรุณากรอกข้อมูล"))
        return;
      }
      this.onFirststep()
      alert(JSON.stringify("บันทึกสำเร็จ กดปุ่ม 'ถัดไป'"))
    }




  }
  onUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addhouseForm.invalid) {
      alert(JSON.stringify("กรุณากรอกข้อมูล"))
      return;
    }
    this.getZipCode()
    this.credentials.SellPrice = this.credentials.SellPrice.replace(/,/g, "")
    this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/,/g, "")
    this.credentials.MarketPrice = this.credentials.MarketPrice.replace(/,/g, "")
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    this.auth.EditHouse(this.credentials).subscribe(
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
  buildage: number
  onGetbuildage(year) {
    var yearEN = new Date().getFullYear();
    this.buildage = ((yearEN + 543) - year);
    this.credentials.BuildingAge = this.buildage.toString()

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
      this.amphur.sort((a, b) => a.AMPHUR_NAME.localeCompare(b.AMPHUR_NAME));
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
      this.district.sort((a, b) => a.DISTRICT_NAME.localeCompare(b.DISTRICT_NAME));
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
    this.credentials.ContactUt = item.ID_Contact
    this.credentials.ContactUo = item.ID_Contact
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
    this.credentials.ContactUo = item.ID_Contact

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





  propType: string;
  IDprop: string;
  onFirststep() {
    this.back = "true"
    this.getZipCode()
    this.credentials.SellPrice = this.credentials.SellPrice.replace(/,/g, "")
    this.credentials.CostestimateB = this.credentials.CostestimateB.replace(/,/g, "")
    this.credentials.MarketPrice = this.credentials.MarketPrice.replace(/,/g, "")
    this.credentials.Latitude = this.latitude
    this.credentials.Longitude = this.longitude
    this.credentials.Longitude = this.longitude
    if (this.credentials.PropertyType == "อาคารพาณิชย์") {
      this.propType = "p"
    }
    if (this.credentials.PropertyType == "บ้าน") {
      this.propType = "h"
    }
    if (this.credentials.PropertyType == "คอนโด") {
      this.propType = "c"
    }

    this.onRandom()
    this.auth.getallhouse().subscribe((house) => {
      this.details = house

      this.details.filter(article => {
        this.IDprop = article.ID_Property
        console.log(this.IDprop + "----------------data")
        this.onCheckTwo()
      });
      console.log("..........." + this.credentials.ID_Property + " END")
      this.auth.addhouse(this.credentials).subscribe(
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
        console.log(this.IDcon + "-------Contact222 ")
        this.onCheckContact()
      });
    },
      err => {
        console.error(err)
      }
    )
  }
  onCheckContact() {
    console.log(this.ContactID + "FIrst ")
    while (this.IDcon == this.ContactID) {
      this.loopChackcontact()
    }
    this.credentials.ID_Contact = this.ContactID
    console.log(this.credentials.ID_Contact)
  }
  //*****chack ID property */
  onRandom() {
    var max = 9;
    var min = 0;
    var r = Math.floor(Math.random() * (max - min + 1) + min);
    var x = Math.floor(Math.random() * (max - min + 1) + min);
    var y = Math.floor(Math.random() * (max - min + 1) + min);
    var z = Math.floor(Math.random() * (max - min + 1) + min);
    this.createID = this.propType + r + x + y + z;

  }
  loopChack() {
    this.onRandom()
    this.auth.getallhouse().subscribe((house) => {
      this.details = house

      this.details.filter(article => {
        this.IDprop = article.ID_Property
        // console.log(this.IDprop + "-------data2222 ")
        this.onCheckTwo()
      });
    },
      err => {
        console.error(err)
      }
    )
  }
  onCheckTwo() {
    // console.log(this.createID + "FIrst ")
    while (this.IDprop == this.createID) {
      this.loopChack()
    }
    this.credentials.ID_Property = this.createID
    //console.log(this.credentials.ID_Property)


  }
}