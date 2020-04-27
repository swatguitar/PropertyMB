import { Component, OnInit, } from '@angular/core';
import { AuthenticationService, UserDetails, TokenPayload } from '../../../authentication.service'
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { MustMatch } from '../../register/helper/must-match.validator';
import { Router } from '@angular/router';
const uri = 'https://upbeat-repeater-264507.appspot.com/users/uploadprofile';
//const uri = 'http://localhost:3001/users/uploadprofile';
//const uri = 'https://polar-fjord-21366.herokuapp.com/users/uploadprofile';
@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})

export class UpdateprofileComponent implements OnInit {
  ID_User: number
  showSpinner2: boolean ;
  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder,private http: HttpClient, public sanitizer: DomSanitizer,private router: Router) { 
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('ID_User' , this.ID_User);
     };
    this.uploader.onAfterAddingFile = () => {
      this.uploader.uploadAll();
    }
    
    
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      this.onFinish()
      this.showSpinner2 = true
      setTimeout(() => {
        this.showSpinner2 = false
        alert(JSON.stringify("อัพโหลดสำเร็จ"))
      }, 15000);
    
   if(response){
    console.log("response"+JSON.stringify(response));
  }
 }
  }
  uploader: FileUploader = new FileUploader({ url: uri 
  });
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
  details: UserDetails
  Profileimage:string
  updateForm: FormGroup;
  updateDForm: FormGroup;
  updateQForm: FormGroup;
  updatepassForm: FormGroup;
  submitted = false;
  currentSection = 'section1';
  change1: boolean = false
  change2: boolean = false
  change3: boolean = false
  OldPassword:string
  UserType:string

  ngOnInit() {
    this.updateForm =  new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      LocationU: new FormControl(''),
      Phone: new FormControl(''),
      Gender: new FormControl(''),
      Birthday: new FormControl(''),
      Age: new FormControl(''),

    });

    this.updateDForm = new FormGroup({
      UserType: new FormControl('')
    });

    this.updateQForm = new FormGroup({
      Question: new FormControl('', Validators.required),
      Answer: new FormControl('', Validators.required)
    });

    this.updatepassForm = this.formBuilder.group({
      OldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.auth.profile().subscribe(
      user => {
        this.details = user
        this.UserType = user.UserType
        this.Profileimage = user.ProfileImg
        this.ID_User = user.ID_User
        if(this.Profileimage == null || this.Profileimage ==  ''){
          if(user.Gender=='ชาย'){
            this.Profileimage = 'Defult/img_Profile_men.png'
          }else if(user.Gender=='หญิง'){
            this.Profileimage = 'Defult/img_Profile_women.png'
          }else{
            this.Profileimage = 'Defult/img_Profile_not.png'
          }
          console.log(this.Profileimage+'5555' )
        }
        
      },
      err => {
        console.error(err)
      }
    )
    this.onFinish()
  }
  get U() { return this.updateForm.controls; }
  get D() { return this.updateDForm.controls; }
  get Q() { return this.updateQForm.controls; }
  get P() { return this.updatepassForm.controls; }


  onChange1() {
    this.change1 = false
    this.change2 = false
    this.change3 = false
  }
  onChange2() {
    this.change1 = true
    this.change2 = true
    this.change3 = false
  }
  onChange3() {
    this.change1 = true
    this.change2 = false
    this.change3 = true
  }
  onGetUpdateFn(value) {
    this.credentials.Firstname = value
  }
  onGetUpdateLn(value) {
    this.credentials.Lastname = value
  }
  onGetUpdateLu(value) {
    this.credentials.LocationU = value
  }
  onGetUpdateP(value) {
    this.credentials.Phone = value
  }
  onGetUpdateG(value) {
    this.credentials.Gender = value
  }
  onGetUpdateB(value) {
    this.credentials.Birthday = value
  }
  onGetUpdateA(value) {
    this.credentials.Age = value
  }
  onGetUpdateD(value) {
    this.UserType = value
  }
  onUpdateA(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    //this.loading = true
    if(this.credentials.Firstname == ''){
      this.credentials.Firstname = this.details.Firstname
    }
    if(this.credentials.Lastname == ''){
      this.credentials.Lastname = this.details.Lastname
    }
    if(this.credentials.LocationU == ''){
      this.credentials.LocationU = this.details.LocationU
    }
    if(this.credentials.Phone == ''){
      this.credentials.Phone = this.details.Phone
    }
    if(this.credentials.Gender == ''){
      this.credentials.Gender = this.details.Gender
    }
    if(this.credentials.Birthday == ''){
      this.credentials.Birthday = this.details.Birthday
    }
    if(this.credentials.Age == ''){
      this.credentials.Age = this.details.Age
    }
    if(this.credentials.UserType == ''){
      this.credentials.UserType = this.details.UserType
    }
   


    this.auth.updateprofile(this.credentials).subscribe(
      () => {
        //this.loading = false
        alert(JSON.stringify("บันทึกสำเร็จ"))
        //this.router.navigateByUrl('/login');
      },
      err => {
        console.error(err);

      }
    );
  }
  comparePassword(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.updatepassForm.invalid) {
      return;
    }
    this.auth.resetpasswordM(this.credentials).subscribe(
      (response) => {
        if(response.error){
          alert(JSON.stringify(response.error))
        }else{
          alert(JSON.stringify("รีเซ็ท รหัสผ่าน สำเร็จ"))
        }
        
      },
      err => {
        console.error(err);

      }
    );
 
  }
 
  RemoveImage(){
    this.auth.removeimgProfile(this.credentials).subscribe(() => {
      alert(JSON.stringify("ลบรูปภาพสำเร็จ"))
      this.refresh()
    },
      err => {
        console.error(err)
      }
    )
    
  }
  onFinish() {

  }

  refresh(): void {
    window.location.reload();
}

}
