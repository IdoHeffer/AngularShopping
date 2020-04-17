import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/ProductsService';
import { CartsService } from 'src/app/services/CartsService';
import { Cart } from 'src/app/models/Cart';
import { CartData } from 'src/app/models/CartData';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Location } from '@angular/common'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cartData: CartData[];
  public cartItem: CartItem;
  public products: Product[];
  public isShowAllProduct: boolean;
  public displayedProduct: Product;
  public displayedImg: Product;
  public cart : Cart;
  public CartPrice : number;
  public perItemPrice: number;

  constructor(private router: Router, private cartsService: CartsService, public location: Location) { 
    this.products = [];
    this.displayedProduct;
    this.cartData = this.cartsService.CartData;
    this.cartsService = cartsService;
    this.CartPrice =0;
  }

  ngOnInit() {

    const observableCart = this.cartsService.getUserCart();
    observableCart.subscribe(userCartFromServer => {
      this.cartData = userCartFromServer;
      if (this.cartData ==[]){

      }
      console.log(this.cartData)
      console.log(userCartFromServer);
      this.totalItemsPrice();
    }, error => {
      const observableNewCart = this.cartsService.createNewCart();
      observableCart.subscribe(userCartFromServer => {

      });
    });
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
}
