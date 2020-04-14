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


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    public cartData: CartData[];
    public cartItem:CartItem;
    public products: Product[];
    public isShowAllProduct: boolean;
    public byName:string;
    public displayedProduct:Product;
    public displayedImg:Product;
    public categories : Category[];

    //   constructor(private userService:UserService) { }
    constructor( private productsService: ProductsService,private categoriesService: CategoriesService,private router: Router, private cartsService: CartsService) {
        this.products = [];
        this.categories = [];
        this.byName = "";
        this.displayedProduct;
        this.cartData = this.cartsService.CartData;
        this.cartsService = cartsService;
    }

    ngOnInit() {
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

        const observableCart = this.cartsService.getUserCart();
        observableCart.subscribe(userCartFromServer => {
        this.cartData = userCartFromServer;
        console.log(this.cartData)
        console.log(userCartFromServer);
        })

        // const observableCartItems = this.cartsService.getAllCartItems(this.cart.CartID);
        // observableCartItems.subscribe(userItemsFromServer => {
        // this.cartItems = userItemsFromServer;
        // console.log(this.cartItems)
        // console.log(userItemsFromServer);
        // })
   
    }

    public showProduct(product: Product) {
      // Debugging using printing the object value in the browser's console
      console.log(product);
      this.isShowAllProduct = false;
      this.displayedProduct = product;
      this.displayedImg = product;
      this.calcToalItemPrice(this.quantity,this.displayedProduct.Price);
    }

    public showProducts(){
        this.isShowAllProduct = true;
        this.quantity = 1;
       
    }

    public purchaseProduct(product:Product){
        this.cartItem = new CartItem (this.cartData[0].CartID,product.ProductID,this.quantity || 1, this.ToalItemPrice || product.Price);
        console.log(this.cartItem);
        this.isShowAllProduct = true;
        const observableCartItem = this.cartsService.purchaseProduct(this.cartItem);
        observableCartItem.subscribe(successfulCartItemAdd => {
          console.log(successfulCartItemAdd); 
          const observableCart = this.cartsService.getUserCart();
            observableCart.subscribe(userCartFromServer => {
            this.cartData = userCartFromServer;
            console.log(this.cartData)
            console.log(userCartFromServer);
          });       
          this.quantity = 1;
          this.router.navigate(["/Products"]);

        }, serverErrorResponse => {
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
        });
      

    }

    public removeCartItem(itemID:number){
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
    }

    public categoryProducts(value){
      let observable = this.productsService.getAllCategoriesProducts(value);
      observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
      }, error => {
        alert('Failed to get products ' + JSON.stringify(error));
      });
    }

    public getAllProducts(){
        let observable = this.productsService.getAllProducts();
        observable.subscribe(productsList => {
        this.products = productsList;
        console.log(1)
        console.log(productsList)
        }, error => {
          alert('Failed to get products ' + JSON.stringify(error));
        });

    }

    public calcToalItemPrice(num1:number,num2:number){
      this.ToalItemPrice = num1*num2;
      console.log(num1,num2);
      return this.ToalItemPrice;
    }

    public ToalItemPrice :number;
    quantity:number=1;
    i=1
    plus(num:number){
      if(this.i !=10){
        this.i++;
        this.quantity=this.i;
        this.calcToalItemPrice(this.quantity,num);
      }
    }
    minus(num:number){
      if(this.i !=1){
        this.i--;
        this.quantity=this.i;
        this.calcToalItemPrice(this.quantity,num);
      }
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
