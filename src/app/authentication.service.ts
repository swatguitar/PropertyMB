import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'



export interface UserDetails {
  ID_User: number
  Firstname: string
  Lastname: string
  Email: string
  UserType: string
  Password: string
  Birthday: string
  LocationU: string
  Phone: string
  Question: string
  Answer: string
  ProfileImg: string
  Age: string
  Gender: string
  Created: Date
  exp: number
  iat: number
}
export interface ImageID {
  ID_Property: string
  ID_Lands: string
  ID_Photo: string
  URL: string
}
export interface PDF {
  ID_Property: string
  ID_Lands: string
  ID_Photo: string
  URL: string
  content: string
  filename:string
}
export interface UserType {
  ID_Property: string
  ID_Lands: string
  ID_Photo: string
  LProvince: string
  PriceMax: number
  PriceMin: number
  UserType: string
}
export interface FilterProperty {
  PropertyType: string
  HomeCondition: string
  Deed: string
  PriceMax: number
  PriceMin: number
  LProvince: string
  LAmphur: string
  LDistrict: string
}


export interface locationsDetails {
  PROVINCE_ID: number
  PROVINCE_CODE: string
  PROVINCE_NAME: string
  GEO_ID: number
  AMPHUR_ID: number
  AMPHUR_CODE: string
  AMPHUR_NAME: string
  DISTRICT_ID: number
  DISTRICT_CODE: string
  DISTRICT_NAME: string
  ZIPCODE_ID: number
  ZIPCODE: string
}

export interface GroupDetails {
  ID_Group: number
  ID_Item: number
  ID_Property: string
  ID_member: number
  ID_User: number
  Email: string
  ID_Folder: number
  NameG: string
  NameF: string
  Img: string
  Created: string
}
export interface PropertyH {
  ID_Property: string
  PropertyType: string
  AnnounceTH: string
  CodeDeed: string
  SellPrice: string
  Costestimate: string
  CostestimateB: string
  MarketPrice: string
  BathRoom: string
  BedRoom: string
  CarPark: string
  HouseArea: number
  Floor: string
  LandR: string
  LandG: string
  LandWA: string
  LandU: string
  HomeCondition: string
  BuildingAge: string
  BuildFD: string
  BuildFM: string
  BuildFY: string
  Directions: string
  RoadType: string
  RoadWide: string
  GroundLevel: string
  GroundValue: string
  MoreDetails: string
  Latitude: number
  Longitude: number
  AsseStatus: string
  ObservationPoint: string
  Location: string
  LProvince: string
  LAmphur: string
  LDistrict: string
  LZipCode: string
  ContactU: string
  ContactS: string
  ContactUo: string
  ContactSo: string
  ContactUt: string
  ContactSt: string
  Blind: number
  Neareducation: number
  Cenmarket: number
  Market: number
  River: number
  Mainroad: number
  Insoi: number
  Letc: string
  airconditioner: number
  afan: number
  AirPurifier: number
  Waterheater: number
  WIFI: number
  TV: number
  refrigerator: number
  microwave: number
  gasstove: number
  wardrobe: number
  TCset: number
  sofa: number
  bed: number
  shelves: number
  CCTV: number
  Securityguard: number
  pool: number
  Fitness: number
  Publicarea: number
  ShuttleBus: number
  WVmachine: number
  CWmachine: number
  Elevator: number
  Lobby: number
  ATM: number
  BeautySalon: number
  Balcony: number
  EventR: number
  MeetingR: number
  LivingR: number
  Hairsalon: number
  Laundry: number
  Store: number
  Supermarket: number
  CStore: number
  MFee: string
  Kitchen: number
  LandAge: string
  Created: string
  PPStatus: string
  ImageEX: string
  Owner: string


}
export interface PropertyDetails {
  //----land---
  ID_Lands: string
  ColorType: string
  CodeProperty: string
  Land: string
  Deed: string
  Place: string
  TypeCode: string
  PriceWA: string
  WxD: string
  //------house-----
  ID_Property: string
  PropertyType: string
  AnnounceTH: string
  CodeDeed: string
  SellPrice: string
  CostestimateB: string
  Costestimate: string
  MarketPrice: string
  BathRoom: string
  BedRoom: string
  CarPark: string
  HouseArea: number
  Floor: string
  LandR: string
  LandG: string
  LandWA: string
  LandU: string
  HomeCondition: string
  BuildingAge: string
  BuildFD: string
  BuildFM: string
  BuildFY: string
  Directions: string
  RoadType: string
  RoadWide: string
  GroundLevel: string
  GroundValue: string
  MoreDetails: string
  Latitude: number
  Longitude: number
  AsseStatus: string
  ObservationPoint: string
  Location: string
  LProvince: string
  LAmphur: string
  LDistrict: string
  LZipCode: string
  ContactU: string
  ContactS: string
  ContactUo: string
  ContactSo: string
  ContactUt: string
  ContactSt: string
  LandAge: string
  PPStatus: string
  ImageEX: string
  Owner: string
  //------ forniture-----

  ShuttleBus: number
  Publicarea: number
  Fitness: number
  pool: number
  Securityguard: number
  CCTV: number
  shelves: number
  sofa: number
  bed: number
  TCset: number
  wardrobe: number
  gasstove: number
  microwave: number
  refrigerator: number
  TV: number
  WIFI: number
  Waterheater: number
  AirPurifier: number
  afan: number
  airconditioner: number
  //-----อสังหา---
  MFee: string
  //-----condo---
  WVmachine: number
  CWmachine: number
  Elevator: number
  Lobby: number
  ATM: number
  BeautySalon: number
  Hairsalon: number
  Laundry: number
  Store: number
  Balcony: number
  MeetingR: number
  EventR: number
  LivingR: number
  Supermarket: number
  CStore: number
  //-------locate--
  Blind: number
  Neareducation: number
  Cenmarket: number
  Market: number
  River: number
  Mainroad: number
  Insoi: number
  Letc: string
  //------ contact ------
  ID_Contact: string
  ContactName: string
  ContactEmail: string
  ContactLine: string
  ContactPhone: string
  Created: string

}


interface TokenResponse {
  token: string
}
export interface ID {
  ID_Lands: string
  ID_Property: string
  PPStatus: string
  ContactU: string
  ContactUo: string
  ContactUt: string
}

export interface Location {
  PROVINCE_ID: number
  AMPHUR_ID: number
  DISTRICT_ID: number
  ZIPCODE_ID: number
}


export interface TokenPayload {
  //------user----
  ID_User: number
  Firstname: string
  Lastname: string
  UserType: string
  Email: string
  OldPassword: string
  Password: string
  Birthday: string
  LocationU: string
  Phone: string
  Token: string
  Answer: string
  ProfileImg: string
  Age: string
  Gender: string
  //----land---
  ID_Lands: string
  ColorType: string
  PricePM: string
  Land: string
  CodeProperty: string
  Deed: string
  Place: string
  TypeCode: string
  PriceWA: string
  WxD: string
  //------house-----
  ID_Property: string
  PropertyType: string
  AnnounceTH: string
  CodeDeed: string
  SellPrice: string
  Costestimate: string
  CostestimateB: string
  MarketPrice: string
  BathRoom: string
  BedRoom: string
  CarPark: string
  HouseArea: number
  Floor: string
  LandR: string
  LandG: string
  LandWA: string
  LandU: string
  HomeCondition: string
  BuildingAge: string
  BuildFD: string
  BuildFM: string
  BuildFY: string
  Directions: string
  RoadType: string
  RoadWide: string
  GroundLevel: string
  GroundValue: string
  MoreDetails: string
  Latitude: number
  Longitude: number
  AsseStatus: string
  ObservationPoint: string
  Location: string
  LProvince: string
  LAmphur: string
  LDistrict: string
  LZipCode: string
  ContactU: string
  ContactS: string
  ContactUo: string
  ContactSo: string
  ContactUt: string
  ContactSt: string
  LandAge: string
  PPStatus: string
  ImageEX: string
  Owner: string
  //------ forniture-----

  ShuttleBus: number
  Publicarea: number
  Fitness: number
  pool: number
  Securityguard: number
  CCTV: number
  shelves: number
  sofa: number
  bed: number
  TCset: number
  wardrobe: number
  gasstove: number
  microwave: number
  refrigerator: number
  TV: number
  WIFI: number
  Waterheater: number
  AirPurifier: number
  afan: number
  airconditioner: number
  //-----อสังหา---
  MFee: string
  //-----condo---
  WVmachine: number
  CWmachine: number
  Elevator: number
  Lobby: number
  ATM: number
  BeautySalon: number
  Hairsalon: number
  Laundry: number
  Store: number
  Balcony: number
  MeetingR: number
  EventR: number
  Kitchen: number
  LivingR: number
  Supermarket: number
  CStore: number
  //-------locate--
  Blind: number
  Neareducation: number
  Cenmarket: number
  Market: number
  River: number
  Mainroad: number
  Insoi: number
  Letc: string
  imgProperty: File
  //------ contact ------
  ID_Contact: string
  ContactName: string
  ContactEmail: string
  ContactLine: string
  ContactPhone: string



}

@Injectable()
export class AuthenticationService {
  ROOT_URL = "https://backendppmb.herokuapp.com";//HUROKU
  //ROOT_URL = "http://localhost:3001";
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return true
    } else {
      return false
    }
  }
  //-----------Post Put----------
  public register(user: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/register`, user)
  }
  public resetpassword(user: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/ResetPass`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    },)
  }
  public resetpasswordM(user: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/ResetPassM`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public sendEmail(user: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/sendEmail`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public compareToken(user: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/compareToken`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public updateprofile(user: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/updateprofile`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public GetEmail(user: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/GetEmail`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public addgroup(group: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addgroup`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public CreateF(group: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/createfolder`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public CreateList(group: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addAnnouce`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public addland(land: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addland`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public EditContact(contact: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditContact`, contact, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public addcontact(contact: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addContact`, contact, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public addhouse(house: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/addhouse`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public EditHouse(house: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditHouse`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public EditLand(land: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditLand`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public uploadimg(house: TokenPayload): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/upload`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

   //************************ DELETE************************* */
  public removeimgProfile(user: TokenPayload): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/removeimg`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public DeleteImageH(user: ImageID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/house/DeleteImage`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public DeleteImageL(user: ImageID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/land/DeleteImage`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public DeleteHouse(house: ID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/house/Delete`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public DeleteLands(land: ID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/land/Delete`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  
  //-----------Select----------

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.ROOT_URL + `/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public recommendH(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/recommendHouse`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public recommendL(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/recommendLand`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getland(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/land`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getAllland(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/landsall`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

   //************************ Group  ************************* */
  public getgroup(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/group`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getgroupfolder(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/folder`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getgroupfolderID(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/folder/ID`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getgrouplist(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/folder/list`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public listAll(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/group/folder/listAll`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getgroupM(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/group/onmember`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getgroupAll(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/groupAll`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  
  //************* get group member *************
  public getMember(gruop: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/member`, gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //************* get group user *************
  public getMemberlist(gruop: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/group/ListDetailMember`, gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getMemberAdd(gruop: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/group/member/add`, gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getMemberchack(gruop: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/member/chack`, gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getGroupDetailMember(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/group/groupDetailMember`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getGroupById(gruop: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/group/groupbById`,gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getPeropertyInFolder(gruop: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/group/folder/Listproperty`,gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getLandInFolder(gruop: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/group/folder/ListLand`,gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getGroupOwnerInfo(gruop: GroupDetails): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/group/owner`,gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getMemberHDetail(gruop: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/member/houseDetail`,gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getMemberLDetail(gruop: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/member/landDetail`,gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  

  //************************ Update  ************************* */
  public houseUpdate(house: ID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/houseUpdate`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public landUpdate(land: ID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/landUpdate`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //************************ Update status ************************* */
  public UpdateStatus(house: ID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/UpdateStatus`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public UpdateStatusL(land: ID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/UpdateStatusL`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }


  public DeletegroupF(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/folder/Delete`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public Deletegroup(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/Delete`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public DeletegroupM(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/member/Delete`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public DeletegroupP(group: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/group/Annouce/Delete`, group, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public UpdategroupN(gruop: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditGroupName`, gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public UpdatefolderN(gruop: GroupDetails): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/EditFolderName`, gruop, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }


 //************************ GET LOCATION ************************* */
  public getProvine(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/Province`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getAmphur(location): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/Amphur`,location, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getDistrict(location): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/District`,location, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getZipcode(location): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/Zipcode`,location, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }



  //************************ Filter *********************** House Details **** */
  public filterHouse(house): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/filterHouse`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public filterLand(land): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/filterLand`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //************************ get house by property id *********************** House Details **** */
  public GetHouseDetail(house): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/houseDetail`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getimghouse(house: ImageID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/imghouse`, house, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public gethouse(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/house`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getallhouse(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/houses`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //************************ get CONTACT ***********************  **** */
  public getContactDetail(contact: ID): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/contactDetail`, contact, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getContact(): Observable<any> {
    return this.http.get(this.ROOT_URL + `/users/contact`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public getContactDuplicate(contact: ID): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/contactDuplicate`, contact, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  //************************ get land by land id *********************** Land Details **** */
  public GetLandDetail(land): Observable<any> {
    return this.http.post(this.ROOT_URL + `/users/landDetail`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  public getimgland(land: ImageID): Observable<any> {
    return this.http.put(this.ROOT_URL + `/users/imgland`, land, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

    //************************ Recommend *********************** **** */
    public RecommendLnad(userType: UserType): Observable<any> {
      return this.http.put(this.ROOT_URL + `/users/LandRecommend`, userType, {
        headers: { Authorization: ` ${this.getToken()}` }
      })
    }
    public RecommendHouse(userType: UserType): Observable<any> {
      return this.http.put(this.ROOT_URL + `/users/HouseRecommend`, userType, {
        headers: { Authorization: ` ${this.getToken()}` }
      })
    }

    public PythonLand(userType: UserType): Observable<any> {
      return this.http.post(this.ROOT_URL + `/recommendLand`, userType, {
        headers: { Authorization: ` ${this.getToken()}` }
      })
    }
    public PythonHouse(userType: UserType): Observable<any> {
      return this.http.post(this.ROOT_URL + `/recommendHouse`, userType, {
        headers: { Authorization: ` ${this.getToken()}` }
      })
    }

    
    //************************ PDF *********************** **** */
    public PDFLnad(PDF: PDF): Observable<any> {
      return this.http.post(this.ROOT_URL + `/users/LandPDF`, PDF, {
        headers: { Authorization: ` ${this.getToken()}` },responseType: 'arraybuffer'
      })
    }
    public PDFHouse(PDF: PDF): Observable<any> {
      return this.http.post(this.ROOT_URL + `/users/HousePDF`, PDF, {
        headers: { Authorization: ` ${this.getToken()}` },responseType: 'arraybuffer'
      })
    }
  

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
