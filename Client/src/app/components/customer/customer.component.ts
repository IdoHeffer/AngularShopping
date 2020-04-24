import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/CategoriesService';
import { ProductsService } from 'src/app/services/ProductsService';
import { CartsService } from 'src/app/services/CartsService';
import { Cart } from 'src/app/models/Cart';
import { CartData } from 'src/app/models/CartData';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Location } from '@angular/common'


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public isShowCartView: boolean
  public cartData: CartData[];
  public cartItem: CartItem;
  public products: Product[];
  public isShowAllProduct: boolean;
  public byName: string;
  public displayedProduct: Product;
  public displayedImg: Product;
  public categories: Category[];
  public cart : Cart;
  public CartPrice : number;

  //   constructor(private userService:UserService) { }
  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private router: Router, private cartsService: CartsService, public location: Location) {
    this.products = [];
    this.categories = [];
    this.byName = "";
    this.displayedProduct = this.products[0];
    this.cart = this.cartsService.cart
    this.cartData = this.cartsService.CartData;
    this.cartsService = cartsService;
    this.CartPrice =0;
  }

  ngOnInit() {
    this.isShowCartView = true;
    this.isShowAllProduct = true;
    let observable = this.productsService.getAllProducts();
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });

    this.isShowAllProduct = true;
    let observableCategories = this.categoriesService.getAllCategories();
    observableCategories.subscribe(CategoriesList => {
      this.categories = CategoriesList;
      console.log(1)
      console.log(CategoriesList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });

    const observableidCart = this.cartsService.isCart();
    observableidCart.subscribe(userCartDetailServer => {
      this.cart = userCartDetailServer[0];
      this.cartsService.cart =userCartDetailServer[0];
      const observableCart = this.cartsService.getUserCart();
      observableCart.subscribe(userCartItemsFromServer => {
        this.cartData = userCartItemsFromServer;
        if (this.cartData ==[]){
          this.cartData =[];
        }
        console.log(this.cartData);
        this.totalItemsPrice();
       console.log(userCartItemsFromServer);
      }, error => {
        return console.log(error);
      });
      },error => {
        console.log(error);
        this.refreshCart()
  });}

  public showProduct(product: Product) {
    // Debugging using printing the object value in the browser's console
    console.log(product);
    this.isShowAllProduct = false;
    this.displayedProduct = product;
    this.displayedImg = product;
    this.calcToalItemPrice(this.quantity, this.displayedProduct.Price);
  }

  public showProducts() {
    this.isShowAllProduct = true;
    this.quantity = 1;
    this.displayedProduct=null;

  }

  public purchaseProduct(product: Product) {
    this.cartItem = new CartItem(this.cart.CartID, product.ProductID, this.quantity || 1, this.ToalItemPrice || product.Price);
    console.log(this.cartItem);
    this.isShowAllProduct = true;
    const observableCartItem = this.cartsService.purchaseProduct(this.cartItem);
    observableCartItem.subscribe(successfulCartItemAdd => {
      console.log(successfulCartItemAdd);
      this.quantity = 1;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });
    this.refreshCart();
    
  }

  public refreshCart(): void {

    this.router.navigateByUrl("/Refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  public removeCartItem(itemID: number) {
    const observableCart = this.cartsService.deleteCartItem(itemID);
    observableCart.subscribe(userCartFromServer => {
      const observableCart = this.cartsService.getUserCart();
      observableCart.subscribe(userCartFromServer => {
        this.cartData = userCartFromServer;
        console.log(this.cartData)
        console.log(userCartFromServer);
      });
      console.log(userCartFromServer);
    })
    this.refreshCart();
  }


  public deleteAllCartItems(cartID:number){
    const observableCart = this.cartsService.deleteAllCartItems(cartID);
    observableCart.subscribe(userCartFromServer => {
      const observableCart = this.cartsService.getUserCart();
      observableCart.subscribe(userCartFromServer => {
        this.cartData = userCartFromServer;
        console.log(this.cartData)
        console.log(userCartFromServer);
      });
      console.log(userCartFromServer);
    })
    this.refreshCart();
  }

  public categoryProducts(value) {
    let observable = this.productsService.getAllCategoriesProducts(value);
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  public getAllProducts() {
    let observable = this.productsService.getAllProducts();
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });

  }

  public calcToalItemPrice(num1: number, num2: number) {
    this.ToalItemPrice = num1 * num2;
    console.log(num1, num2);
    return this.ToalItemPrice;
  }

  public ToalItemPrice: number;
  quantity: number = 1;
  i = 1
  plus(num: number) {
    if (this.i != 10) {
      this.i++;
      this.quantity = this.i;
      this.calcToalItemPrice(this.quantity, num);
    }
  }
  minus(num: number) {
    if (this.i != 1) {
      this.i--;
      this.quantity = this.i;
      this.calcToalItemPrice(this.quantity, num);
    }
  }

  public totalItemsPrice(){
    for (let i = 0; i < this.cartData.length; i++) {
      this.CartPrice = this.CartPrice + this.cartData[i].TotalItemPrice;
    }
    return this.CartPrice;
  }

  public isShowCartSideBar() {
    if (this.isShowCartView == true) {
      this.isShowCartView = false
      let main = document.getElementById("main");
      main.className = "flexScreen";
      let header = document.getElementById("header");
      header.className = "flexScreen";
      return this.isShowCartView = false
    }
    if (this.isShowCartView == false) {
      this.isShowCartView = true;
      let main = document.getElementById("main");
      main.classList.remove("flexScreen");
      let header = document.getElementById("header");
      header.classList.remove("flexScreen");
      return this.isShowCartView = true
    }
  }

  public hideCartSideBar() {
    this.isShowCartView = false;
    
  }
}
