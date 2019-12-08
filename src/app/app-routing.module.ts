import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { LandsComponent } from './components/lands/lands.component';
import { HousesComponent } from './components/houses/houses.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { GroupdetailComponent } from './components/group/grouplist/groupdetail/groupdetail.component';
import { GrouplistComponent } from './components/group/grouplist/grouplist.component';
import { GrouppingComponent } from './components/group/groupping/groupping.component';
import { TestComponent } from './components/test/test.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { PagenotfoundComponent } from './lib/pagenotfound/pagenotfound.component';
import { RecdetailsComponent } from './components/recommend/recdetails/recdetails.component';
import { UploadimgComponent } from './components/addhouse/uploadimg/uploadimg.component';
import { CommingsoonComponent } from './lib/commingsoon/commingsoon.component';
import { HousePdfComponent } from './components/houses/house-pdf/house-pdf.component';
import { ResetpasswordComponent } from './components/login/resetpassword/resetpassword.component';
import { UpdateprofileComponent } from './components/profile/updateprofile/updateprofile.component';
import { HouseupdateComponent } from './components/houses/houseupdate/houseupdate.component';
import { AdminloginComponent } from './components/adminLTE/admin/adminlogin/adminlogin.component';
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
import { EditgroupComponent } from './components/group/grouplist/editgroup/editgroup.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {
    path: "home", component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: "adminlogin", component: AdminloginComponent, },
  { path: "admindash", component: AdmindashComponent, },
  { path: "pagenotfound", component: PagenotfoundComponent },
  { path: "resetPassword", component: ResetpasswordComponent },
  { path: "commingsoon", component: CommingsoonComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "detail", component: DetailComponent },
  {
    path: "recommend", component: RecommendComponent, children: [
      {
        path: '',
        component: RecommendComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: RecdetailsComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  { path: "loading", component: LoadingSpinnerComponent },
  {
    path: "lands", component: LandsComponent, children: [
      {
        path: '',
        component: LandslistComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: LandsDetailComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: "houses/DownloadPDF/:id", 
    component: HousePdfComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "lands/DownloadPDF/:id", 
    component: LandsPDFComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "houses/updateimage/:id", 
    component: UpdateimgHComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "lands/updateimage/:id", 
    component: UpdateimgLComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'houses/houseUpdate/:id',
    component: HouseupdateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'lands/landUpdate/:id',
    component: LandsupdateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/groupfolder/:id',
    component: GrouplistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/groupfolder/Edit/:id',
    component: EditgroupComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/groupfolder/itemlist/:id',
    component: ItemslistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/groupfolder/itemlist/details/:id',
    component: GroupdetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/member/groupfolder/:id',
    component: MememberlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/member/groupfolder/itemlist/:id',
    component: ItemslistmemberComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups/member/groupfolder/itemlist/details/:group/:folder/:id',
    component: MemberdetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "houses", component: HousesComponent, children: [
      {
        path: '',
        component: HouseslistComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: ':id',
        component: HousesDetailComponent,
        canActivate: [AuthGuardService]
      },
    ]
  },
  {
    path: "groups", component: GroupComponent, children: [
      {
        path: '',
        component: GrouppingComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'creategroup',
        component: CreateGComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: "info", component: InfoComponent,
    canActivate: [AuthGuardService]
  },
  { path: "index", component: IndexComponent },
  { path: "test", component: TestComponent },
  {
    path: "addhouse", component: AddhouseComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "addlands", component: AddlandsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "uploadimages", component: UploadimgComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'updateprofile',
    component: UpdateprofileComponent,
    canActivate: [AuthGuardService]
  },
  { path: "**", redirectTo: "pagenotfound" },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
