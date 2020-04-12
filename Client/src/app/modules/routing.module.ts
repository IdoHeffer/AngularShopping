import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../components/main/main.component'
import { FriendsComponent } from '../components/friends/friends.component';
import { RegisterComponent } from '../components/register/register.component';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { LoginGuardService } from '../login.guard';
import { ProductsModule } from 'src/app/modules/products.module'
import { CustomerComponent } from '../components/customer/customer.component';

const routes: Routes = [
    { path: "Home", component: MainComponent },
    // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
    { path: "Friends",component: FriendsComponent },
    { path: "Products", canActivate: [LoginGuardService] ,component: CustomerComponent},
    { path: "ForgotPassword", component: ForgotpasswordComponent },
    { path: "Admin", canActivate: [LoginGuardService] ,loadChildren: "./admin.module" },
    { path: "Register", component: RegisterComponent },
    { path: "Login", component: MainComponent },
    { path: "", redirectTo: "Home", pathMatch: "full" },
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ProductsModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ],
  exports: [RouterModule]
  })
export class RoutingModule {

 }
