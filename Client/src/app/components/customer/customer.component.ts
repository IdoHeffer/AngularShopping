import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
import { ProductsPipeByName} from 'src/app/pipes/ProductsPipeByName'


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit ,OnChanges {
  public isShowCartView: boolean
  @Input() cartData: CartData[];
  public cartItem: CartItem;
  public products: Product[];
  public isShowAllProduct: boolean;
  public byName: string;
  public displayedProduct: Product;
  public displayedImg: Product;
  public categories: Category[];
  public cart : Cart;
  public CartPrice : number;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private router: Router, private cartsService: CartsService, public location: Location) {
    this.products = [];
    this.categories = [];
    this.byName = "";
    this.displayedProduct = new Product();
    this.cart=new Cart()
    this.cartData = [];
    this.cartsService = cartsService;
    this.CartPrice =0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  ngOnInit() {
    
    // boolean for the cart on the side of the page. initial true.
    this.isShowCartView = true;
    // boolean value that changes when the modal dialog pops over. to hide the products int the background.
    this.isShowAllProduct = true;

    // getting all the products from server.
    let observable = this.productsService.getAllProducts();
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      console.log("Error! Status: "+error);
    });

    // getting categorie from server .
    let observableCategories = this.categoriesService.getAllCategories();
    observableCategories.subscribe(CategoriesList => {
      this.categories = CategoriesList;
      console.log(1)
      console.log(CategoriesList)
    }, error => {
      console.log("Error! Status: "+error);
    });

    // function that automatically checks for the user if he/she has a current open cart from last time they loggedIn
    //  OR 
    // generating a new cart if they dont have an open one.
    const observableidCart = this.cartsService.isCart();
    observableidCart.subscribe(userCartDetailServer => {
      console.log(userCartDetailServer)
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

  // open modal function and filling in the needed values 
  public showProduct(product: Product) {
    // Debugging using printing the object value in the browser's console
    console.log(product);
    this.isShowAllProduct = false;
    this.displayedProduct = product;
    this.displayedImg = product;
    this.calcToalItemPrice(this.quantity, this.displayedProduct.Price);
  }

  // reseting the calculations functions + showing the product again.
  public showProducts() {
    this.isShowAllProduct = true;
    this.quantity = 1;
    this.displayedProduct=null;

  }

  // purchase a product. sending it to the server and requesting the cart value to recreate the cart. need to be fixed.
  public purchaseProduct(product: Product) {
    this.cartItem = new CartItem(this.cart.CartID, product.ProductID, this.quantity || 1, this.ToalItemPrice || product.Price);
    console.log(this.cartItem);
    this.isShowAllProduct = true;
    const observableCartItem = this.cartsService.purchaseProduct(this.cartItem);
    observableCartItem.subscribe(successfulCartItemAdd => {
      console.log(successfulCartItemAdd);
      
      let productToadd = new CartData(this.cart.CartID,product.ProductID,product.picture,product.ProductName,this.quantity,this.ToalItemPrice || product.Price);

      this.cartData.push(productToadd);
      this.quantity = 1;





    }, serverErrorResponse => {
      console.log("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
    });
    this.refreshCart();
    
  }


  // temporary func to overcome the recreating cart issue 
  // so we navigate to dummypage and going back to the original (no ducomentation in the browser history for the page changing)
  // and then it automatically draw the cart with right values.
  public refreshCart(): void {

    this.router.navigateByUrl("/Refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }


  // removing item from cart and removing it from the view without refreshing the page.
  public removeCartItem(index:number,itemID: number,ItemPrice :number) {
    this.cartData.splice(index, 1);
    console.log(this.cartData)
    const observableCart = this.cartsService.deleteCartItem(itemID);
    observableCart.subscribe(userCartFromServer => {
      
      // const observableCart = this.cartsService.getUserCart();
      // observableCart.subscribe(userCartFromServer => {
      //   this.cartData = userCartFromServer;
      //   console.log(this.cartData)
      //   console.log(userCartFromServer);
      // });
      // console.log(userCartFromServer);
      // this.totalItemsPrice(this.cartData);
    })
    this.CartPrice= this.CartPrice -ItemPrice;
    // this.refreshCart();
   
  }


  // clear cart funtion to delete all cart content.
  public deleteAllCartItems(cartID:number){
    this.cartData.splice(0,this.cartData.length)

    const observableCart = this.cartsService.deleteAllCartItems(cartID);
    observableCart.subscribe(userCartFromServer => {
      // const observableCart = this.cartsService.getUserCart();
      // observableCart.subscribe(userCartFromServer => {
      //   this.cartData = userCartFromServer;
      //   console.log(this.cartData)
      //   console.log(userCartFromServer);
      // });
      // console.log(userCartFromServer);
    })
    this.CartPrice=0;
    // this.refreshCart();
  }

  // the functiong that filter the product categories in the navbar and disply them on page.
  public categoryProducts(value) {
    let observable = this.productsService.getAllCategoriesProducts(value);
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      console.log("Error! Status: "+error);
    });
  }

  public getAllProducts() {
    let observable = this.productsService.getAllProducts();
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      console.log("Error! Status: "+error);
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

  public totalItemsPrice(cartData? ){
    this.cartData = this.cartData;
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

  // public hideCartSideBar() {
  //   this.isShowCartView = false;
    
  // }
}
