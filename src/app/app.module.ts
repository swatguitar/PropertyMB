import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import { TimeAgoThaiPipe } from './lib/Pipe/TimeAgoThaiPipe';
import { PropertyFilterPipe } from './lib/Pipe/property-filter.pipe';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {FileUploadModule} from 'ng2-file-upload';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxGalleryModule } from 'ngx-gallery';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { ScrollSpyDirective } from './lib/ScrollSpyDirective';

import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { LandsComponent } from './components/lands/lands.component';
import { HousesComponent } from './components/houses/houses.component';
import { InfoComponent } from './components/info/info.component';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service';
import { AddhouseComponent } from './components/addhouse/addhouse.component';
import { AddlandsComponent } from './components/addlands/addlands.component';
import { LandsDetailComponent } from './components/lands/lands-detail/lands-detail.component';
import { LandslistComponent } from './components/lands/landslist/landslist.component';
import { HousesDetailComponent } from './components/houses/houses-detail/houses-detail.component';
import { HouseslistComponent } from './components/houses/houseslist/houseslist.component';
import { GroupComponent } from './components/group/group.component';
import { TestComponent } from './components/test/test.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { PagenotfoundComponent } from './lib/pagenotfound/pagenotfound.component';
import { RecdetailsComponent } from './components/recommend/recdetails/recdetails.component';
import { UploadimgComponent } from './components/addhouse/uploadimg/uploadimg.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadimglandComponent } from './components/addlands/uploadimgland/uploadimgland.component';
import { CommingsoonComponent } from './lib/commingsoon/commingsoon.component';
import { ProvinceFilterPipe } from './lib/Pipe/province.filter.pipe';
import { PriceFilterPipe } from './lib/Pipe/price-filter.pipe';
import { AmphurFilterPipe } from './lib/Pipe/Amphur-filter.pipe';
import { DistrictFilterPipe } from './lib/Pipe/dis-filter.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HousePdfComponent } from './components/houses/house-pdf/house-pdf.component';
import { ResetpasswordComponent } from './components/login/resetpassword/resetpassword.component';
import { UpdateprofileComponent } from './components/profile/updateprofile/updateprofile.component';
import { GroupdetailComponent } from './components/group/grouplist/groupdetail/groupdetail.component';
import { GrouplistComponent } from './components/group/grouplist/grouplist.component';
import { GrouppingComponent } from './components/group/groupping/groupping.component';
import { HouseupdateComponent } from './components/houses/houseupdate/houseupdate.component';
import { AdminloginComponent } from './components/adminLTE/admin/adminlogin/adminlogin.component';
import { AdminfooterComponent } from './components/adminLTE/adminfooter/adminfooter.component';
import { AdminheaderComponent } from './components/adminLTE/adminheader/adminheader.component';
import { AdminmenuComponent } from './components/adminLTE/adminmenu/adminmenu.component';
import { AdminsettingComponent } from './components/adminLTE/adminsetting/adminsetting.component';
import { AdmindashComponent } from './components/adminLTE/admin/admindash/admindash.component';
import { LandsupdateComponent } from './components/lands/landsupdate/landsupdate.component';
import { LandsPDFComponent } from './components/lands/lands-pdf/lands-pdf.component';
import { UpdateimgHComponent } from './components/houses/updateimg-h/updateimg-h.component';
import { UpdateimgLComponent } from './components/lands/updateimg-l/updateimg-l.component';
import { CreateGComponent } from './components/group/create-g/create-g.component';
import { MememberlistComponent } from './components/group/mememberlist/mememberlist.component';
import { MemberdetailsComponent } from './components/group/mememberlist/memberdetails/memberdetails.component';
import { ItemslistComponent } from './components/group/itemslist/itemslist.component';
import { ItemslistmemberComponent } from './components/group/itemslistmember/itemslistmember.component';
import { EditComponent } from './components/group/itemslist/edit/edit.component';
import { EditgroupComponent } from './components/group/grouplist/editgroup/editgroup.component';
import { DetailComponent } from './components/detail/detail.component';






@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    RecommendComponent,
    LandsComponent,
    HousesComponent,
    InfoComponent,
    IndexComponent,
    FooterComponent,
    ProfileComponent,
    AddhouseComponent,
    AddlandsComponent,
    LandsDetailComponent,
    LandslistComponent,
    HousesDetailComponent,
    HouseslistComponent,
    GroupComponent,
    TestComponent,
    LoadingSpinnerComponent,
    TimeAgoThaiPipe,
    PagenotfoundComponent,
    RecdetailsComponent,
    PropertyFilterPipe,
    UploadimgComponent,
    UploadimglandComponent,
    CommingsoonComponent,
    ProvinceFilterPipe,
    PriceFilterPipe,
    AmphurFilterPipe,
    DistrictFilterPipe,
    HousePdfComponent,
    ResetpasswordComponent,
    UpdateprofileComponent,
    ScrollSpyDirective,
    GroupdetailComponent,
    GrouplistComponent,
    GrouppingComponent,
    HouseupdateComponent,
    AdminloginComponent,
    AdmindashComponent,
    AdminsettingComponent,
    AdminmenuComponent,
    AdminheaderComponent, 
    DetailComponent,
    AdminfooterComponent, LandsupdateComponent, LandsPDFComponent, UpdateimgHComponent, UpdateimgLComponent, CreateGComponent, MememberlistComponent, MemberdetailsComponent, ItemslistComponent, ItemslistmemberComponent, EditComponent, EditgroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    GooglePlaceModule,
    TimeagoModule,
    FileUploadModule,
    ArchwizardModule,
    NgxGalleryModule,
    AutocompleteLibModule,
    AutocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtHlvZUC6SiC7cWqS0xm4_PnS9Qc3gF3o',
      libraries: ['places']
    }),
    PDFExportModule,
    BrowserAnimationsModule,
   

  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
