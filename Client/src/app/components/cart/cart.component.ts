import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/ProductsService';
import { LoginGuardService } from 'src/app/login.guard';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/CartsService';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartItems: Product[];
  public cart: Cart;

  constructor(private router: Router, private cartsService: CartsService) {
    // this.cartItems = this.cartsService.cartItems;
    this.cartsService = cartsService;
    this.cart = this.cart;
  }

  ngOnInit() {
    // const observable = this.cartsService.getUserCart();
    // observable.subscribe(userCartFromServer => {
    //   this.cart = userCartFromServer[0];
    //   console.log(this.cart)
    //   console.log(userCartFromServer);
    // })

    const cartItemsobservable = this.cartsService.getAllCartItems(this.cart.CartID);
    cartItemsobservable.subscribe(cartItemsFromServer => {
      this.cartItems = cartItemsFromServer;
      console.log(this.cartItems)
      console.log(cartItemsFromServer);
    })

    // this.cartItems = this.productsService.cartItems;
  }

  isProductsRoute() {

    if (this.router.url === '/Products/Allproducts') {
      return this.router.url === '/Products/Allproducts';
    }

    if (this.router.url === '/Products/Bakery') {
      return this.router.url === '/Products/Bakery';
    }

    if (this.router.url === '/Products/Dairy') {
      return this.router.url === '/Products/Dairy';
    }

    if (this.router.url === '/Products/Meat') {
      return this.router.url === '/Products/Meat';
    }

    if (this.router.url === '/Products/Wines & Beers') {
      return this.router.url === '/Products/Wines & Beers';
    }

    if (this.router.url === '/Products/Vegitables') {
      return this.router.url === '/Products/Vegitables';
    }

    if (this.router.url === '/Products/Fruits') {
      return this.router.url === '/Products/Fruits';
    }

    // return this.router.url === '/Products';
  }

}
