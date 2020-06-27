import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap } from '@angular/router';
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
  public query: string;
  public cart : Cart;
  public CartPrice : number;
  public perItemPrice: number;
  private usersService: UserService;
  public firstName : string;
  public lastName : string;
  public userName : string;


  constructor(private router: Router, private cartsService: CartsService, public location: Location,usersService : UserService, private ordersService : OrdersService) { 
    this.products = [];
    this.cartData = [];
    this.cartsService = cartsService;
    this.cart = new Cart();
    this.CartPrice = 0;
    this.checkOutDetails= new CheckOutDetails ();
    this.usersService = usersService;
  }

  ngOnInit() {  

    // getting the user's current open cart and display it on the list of products. 
    const observableCart = this.cartsService.getUserCart();
    observableCart.subscribe(userCartFromServer => {
      this.cartData = userCartFromServer;
      this.cart.CartID = this.cartData[0].CartID;
      console.log(this.cartData)
      console.log(userCartFromServer);
      this.totalItemsPrice();
    }, error => {
      console.log(error);
    });
    // injecting the total price and the cartID in the object that is being send to the server to close the order.
    this.checkOutDetails.FinalPrice = this.CartPrice;
    this.checkOutDetails.CartID = this.cartsService.cart.CartID;
  }

  // calculating the total items price by going through the products array.
  public totalItemsPrice(){
    for (let i = 0; i < this.cartData.length; i++) {
      this.CartPrice = this.CartPrice + this.cartData[i].TotalItemPrice;
    }
    return this.CartPrice;
  }

  // calculating per item total price. 
  public calcToalItemPrice(num1: number, num2: number) {
    this.perItemPrice = num1 * num2;
    console.log(num1, num2);
    return this.perItemPrice;
  }


  // not working yet
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

  // ,ain function that sending the order to the server and closing the order.
  public placeOrder (){
    this.checkOutDetails.FinalPrice = this.CartPrice;
    this.checkOutDetails.CartID = this.cartsService.cart.CartID;
    const observable = this.ordersService.placeOrder(this.checkOutDetails);
    observable.subscribe(successfulServerRequestData => {
      console.log(successfulServerRequestData)
      // this.router.navigate["/Receipt"];
    }, serverErrorResponse => {
     console.log("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });
    this.router.navigate["/Receipt"];
  }


  //  not working test to highlight input text.
  public highlight(index: number) {
    //if the search input is empty- show the original query
    if (!this.query) {
      return this.cartData[index].ProductName;
    }
    //if the search input dirty- repp the query in a span
    return this.cartData[index].ProductName.replace(new RegExp(this.query, ""), match => {
      return '<span class="highlightText" >' + match + '</span>';
    })
  }

}
