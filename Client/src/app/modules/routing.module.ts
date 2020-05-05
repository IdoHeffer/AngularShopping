import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../components/main/main.component'
import { FriendsComponent } from '../components/friends/friends.component';
import { RegisterComponent } from '../components/register/register.component';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { LoginGuardService } from '../login.guard';
// import { ProductsModule } from 'src/app/modules/products.module'
import { CustomerComponent } from '../components/customer/customer.component';
import { RefreshComponent } from '../components/refresh/refresh.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ReceiptComponent } from '../components/receipt/receipt.component';
import { AllordersComponent } from '../components/allorders/allorders.component';


const routes: Routes = [
    { path: "Home", component: MainComponent },
    // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
    { path: "Receipt",canActivate: [LoginGuardService] ,component: ReceiptComponent },
    { path: "CheckOut",canActivate: [LoginGuardService] ,component: CheckoutComponent },
    { path: "MyOrders",canActivate: [LoginGuardService] ,component: AllordersComponent },
    { path: "Products", canActivate: [LoginGuardService] ,component: CustomerComponent},
    { path: "ForgotPassword", component: ForgotpasswordComponent },
    { path: "Admin", canActivate: [LoginGuardService] ,loadChildren: "./admin.module" },
    { path: "Register", component: RegisterComponent },
    { path: "Refresh", component: RefreshComponent },
    { path: "Login", component: RefreshComponent },
    { path: "", redirectTo: "Home", pathMatch: "full" },
    // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) // Importing the above routes
  ],
  exports: [RouterModule]
  })
export class RoutingModule {

 }
