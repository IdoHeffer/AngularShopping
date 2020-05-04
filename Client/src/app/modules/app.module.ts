import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '../components/layout/layout.component';
import { MenuComponent } from '../components/menu/menu.component';
import { MainComponent } from '../components/main/main.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { UserService } from '../services/UserService';
// import { HttpClient, HttpHandler} from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductsService } from '../services/ProductsService';
import { ProductsPipeByMinPrice } from '../pipes/ProductsPipeByMinPrice';
import { FriendsComponent } from '../components/friends/friends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin.module';
import { RegisterComponent } from '../components/register/register.component';
import { AdminUserService } from '../services/AdminUsersService';
import { FriendsService } from '../services/FriendsService';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { ProductsModule } from './products.module';
import { ConfirmEqualValidator } from '../ValidationsFiles/confirm-equal-validatorts';
import { CartComponent } from '../components/cart/cart.component';
import { RefreshComponent } from '../components/refresh/refresh.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ReceiptComponent } from '../components/receipt/receipt.component';
import { ProdAddComponent } from '../components/prod-add/prod-add.component';




@NgModule({
  declarations: [
  ProductsPipeByMinPrice,
  LayoutComponent,
  MenuComponent,
  MainComponent,
  HeaderComponent,
  FooterComponent,
  FriendsComponent,
  RegisterComponent,
  ForgotpasswordComponent,
  ConfirmEqualValidator,
  CartComponent,
  RefreshComponent,
  CheckoutComponent,
  ReceiptComponent,
  ProdAddComponent,

 ],
  imports: [
    AdminModule,
    BrowserModule,
    FormsModule,
    RouterModule, RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProductsModule
  ],
  providers: [UserService
    , ProductsService,AdminUserService,FriendsService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
    ],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
