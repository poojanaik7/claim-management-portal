import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { MemberComponent } from './components/member/member.component';
import { HttpClientModule } from '@angular/common/http';
import { PolicyComponent } from './components/policy/policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderComponent } from './components/provider/provider.component';
import { MemberhomeComponent } from './components/memberhome/memberhome.component';
import { ClaimComponent } from './components/claim/claim.component';
import { BillsComponent } from './components/bills/bills.component';
import { StatusComponent } from './components/status/status.component';
import { AngularMaterialModule } from './angular-material.module';



const routes:Route []= [
  {path:'member', component:MemberComponent},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'policy/enrollPolicy',component:PolicyComponent},
  {path:'provider',component:ProviderComponent},
  {path:'',component:MemberhomeComponent},
  {path:'claims',component:ClaimComponent},
  {path:'claim/bills',component:BillsComponent},
  {path:'claims/viewStatus',component:StatusComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    MemberComponent,
    PolicyComponent,
    ProviderComponent,
    MemberhomeComponent,
    ClaimComponent,
    BillsComponent,
    StatusComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    AngularMaterialModule,
    RouterModule.forRoot(routes), 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
