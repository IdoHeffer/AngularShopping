import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { UserService } from 'src/app/services/UserService';
import { CartsService } from 'src/app/services/CartsService';
import { Cart } from 'src/app/models/Cart';
import { CartData } from 'src/app/models/CartData';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Location } from '@angular/common'
import { CheckOutDetails } from 'src/app/models/CheckOutDetails';
import { OrdersService } from 'src/app/services/OrdersService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public checkOutDetails: CheckOutDetails;
  public cartData: CartData[];
  public cartItem: CartItem;
  public products: Product[];
  public isShowAllProduct: boolean;
  public cart : Cart;
  public CartPrice : number;
  public perItemPrice: number;
  private usersService: UserService;
  public firstName : string;
  public lastName : string;
  public userName : string;


  constructor(private router: Router, private cartsService: CartsService, public location: Location,usersService : UserService, private ordersService : OrdersService) { 
    this.products = [];
    this.cartData = this.cartsService.CartData;
    this.cartsService = cartsService;
    this.cart =this.cartsService.cart;
    this.CartPrice =0;
    this.checkOutDetails= new CheckOutDetails ();
    this.usersService = usersService;
  }

  ngOnInit() {  
    const observableCart = this.cartsService.getUserCart();
    observableCart.subscribe(userCartFromServer => {
      this.cartData = userCartFromServer;
      this.cart.CartID = this.cartsService.cart.CartID;
      if (this.cartData ==[]){

      }
      console.log(this.cartData)
      console.log(userCartFromServer);
      this.totalItemsPrice();
    }, error => {
      console.log(error);
    });

    this.checkOutDetails.FinalPrice = this.CartPrice;
    this.checkOutDetails.CartID = this.cartsService.cart.CartID;
  }

  public totalItemsPrice(){
    for (let i = 0; i < this.cartData.length; i++) {
      this.CartPrice = this.CartPrice + this.cartData[i].TotalItemPrice;
    }
    return this.CartPrice;
  }


  public calcToalItemPrice(num1: number, num2: number) {
    this.perItemPrice = num1 * num2;
    console.log(num1, num2);
    return this.perItemPrice;
  }

  public fillUserInfo(){
    
    let observable = this.usersService.getUserInfo();
    observable.subscribe(userInfofromserver => {
      this.checkOutDetails.DeliveryCityAddress = userInfofromserver.City;
      this.checkOutDetails.DeliveryStreetAddress = userInfofromserver.Street;
      this.firstName = userInfofromserver.FirstName;
      this.lastName = userInfofromserver.LastName ;
      this.userName = userInfofromserver.UserName;
      console.log(1)
      console.log(userInfofromserver);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });

  }

  public placeOrder (){
    this.checkOutDetails.FinalPrice = this.CartPrice;
    this.checkOutDetails.CartID = this.cartsService.cart.CartID;
    const observable = this.ordersService.placeOrder(this.checkOutDetails);
    observable.subscribe(successfulServerRequestData => {
      console.log(successfulServerRequestData)
      this.router.navigate["/Products"];
    }, serverErrorResponse => {
     alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });
  }

}
