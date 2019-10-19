import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './helper/must-match.validator';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from "../../../authentication.service";
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  credentials: TokenPayload = {
    ID_User: 0,
    Firstname: '',
    Lastname: '',
    Email: '',
    UserType: '',
    OldPassword: '',
    Password: '',
    Birthday: '',
    CodeProperty: '',
    LocationU: '',
    Phone: '',
    ProfileImg: '',
    Token: '',
    Answer: '',
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
    Kitchen:0,
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
  getEmailForm: FormGroup;
  getTokenForm: FormGroup;
  resetForm: FormGroup;
  submitted = false;
  allowedit: boolean = false;
  details: any;
  next: boolean = false;
  nexttwo: boolean = false;
  loading: boolean = false;
  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.getTokenForm = this.formBuilder.group({
      Token: ['', Validators.required],
    });

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });






  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls }
  get E() { return this.getEmailForm.controls }
  get Q() { return this.getTokenForm.controls }



  GetEmail() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.getEmailForm.invalid) {
      return;
    }
    this.loading = true
    this.auth.GetEmail(this.credentials).subscribe((user) => {
      if (!user.error) {
        this.details = user;
        this.credentials.Email = user.Email
        setTimeout(() => {
          this.auth.sendEmail(this.credentials).subscribe(() => {
            this.next = true

            alert(JSON.stringify("กรุณาตรวจสอบอีเมลของท่าน เราได้รีเซ็ตรหัสไปยังอีเมลที่ท่านเคยลงทะเบียนไว้ "))
          },
            err => {
              console.error(err)
            }
          )
          this.loading = false
        }, 2000);
      } else if (user.error) {
        this.loading = false
        alert(JSON.stringify("ไม่พบอีเมลนี้"))
      }
    },
      err => {
        console.error(err)
      }
    )

  }

  onCompareP() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.getTokenForm.invalid) {
      return;
    }
    this.loading = true
    this.auth.compareToken(this.credentials).subscribe((error) => {
      setTimeout(() => {
      if(!error.error){
        this.loading = false
        this.nexttwo = true
      }else{
        this.loading = false
        alert(JSON.stringify(error.error))
      }     
    }, 2000);
    },
      err => {
        console.error(err)
      }
    )




  }

  ResetPassword() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.loading = true

    this.auth.resetpassword(this.credentials).subscribe(
      () => {
        this.loading = false
        alert(JSON.stringify("รีเซ็ท รหัสผ่าน สำเร็จ"))
        this.router.navigateByUrl('/login');
      },
      err => {
        console.error(err);

      }
    );
  }
}
