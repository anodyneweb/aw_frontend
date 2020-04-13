import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { StationComponent } from './station/station.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManageIndustriesComponent } from './manage-industries/manage-industries.component';
import { ManageStationsComponent } from './manage-stations/manage-stations.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'stations', component: StationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'add_industry', component: ManageIndustriesComponent },
  { path: 'add_station', component: ManageStationsComponent },
  { path: 'edit/industry/:id', component: ManageIndustriesComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
