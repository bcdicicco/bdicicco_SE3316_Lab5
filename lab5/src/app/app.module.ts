import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {ValidateService} from './validate.service';
import {AdminService} from './admin.service';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { PoliciesComponent } from './policies/policies.component';

const appRoutes: Routes = [
  { path: '', component: NotLoggedComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'policies', component: PoliciesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotLoggedComponent,
    AdminComponent,
    AdminLoginComponent,
    DashboardComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileComponent,
    PoliciesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule,
    HttpModule
  ],
  providers: [AuthService, ValidateService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
