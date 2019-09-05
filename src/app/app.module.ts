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
import { NgxImageGalleryModule } from 'ngx-image-gallery';

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
import { PropertyComponent } from './components/property/property.component';
import { PropertylistComponent } from './components/property/propertylist/propertylist.component';
import { GroupComponent } from './components/group/group.component';
import { GrouplistComponent } from './components/group/grouplist/grouplist.component';
import { TestComponent } from './components/test/test.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { PagenotfoundComponent } from './lib/pagenotfound/pagenotfound.component';
import { GroupdetailComponent } from './components/group/grouplist/groupdetail/groupdetail.component';
import { RecdetailsComponent } from './components/recommend/recdetails/recdetails.component';
import { UploadimgComponent } from './components/addhouse/uploadimg/uploadimg.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






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
    PropertyComponent,
    PropertylistComponent,
    GroupComponent,
    GrouplistComponent,
    TestComponent,
    LoadingSpinnerComponent,
    TimeAgoThaiPipe,
    PagenotfoundComponent,
    GroupdetailComponent,
    RecdetailsComponent,
    PropertyFilterPipe,
    UploadimgComponent,



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
    NgxImageGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnxeJ2GRXPxGJh4ooPuvbLVQ7g37F1QSY',
      libraries: ['places']
    }),
    PDFExportModule,
    BrowserAnimationsModule,
   

  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
