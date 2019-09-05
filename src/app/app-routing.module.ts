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
import { PropertyComponent } from './components/property/property.component';
import { PropertylistComponent } from './components/property/propertylist/propertylist.component';
import { GroupComponent } from './components/group/group.component';
import { GrouplistComponent } from './components/group/grouplist/grouplist.component';
import { TestComponent } from './components/test/test.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { PagenotfoundComponent } from './lib/pagenotfound/pagenotfound.component';
import { RecdetailsComponent } from './components/recommend/recdetails/recdetails.component';
import { UploadimgComponent } from './components/addhouse/uploadimg/uploadimg.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {
    path: "home", component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  { path: "pagenotfound", component: PagenotfoundComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "recommend", component: RecommendComponent, children: [
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
  ] },
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
      }
    ]
  },
  {
    path: "property", component: PropertyComponent, children: [
      {
        path: '',
        component: PropertylistComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: "groups", component: GroupComponent, children: [
      {
        path: ':id',
        component: GrouplistComponent,
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
  { path: "**", redirectTo: "pagenotfound" },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
