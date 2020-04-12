import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/CategoriesService';
import { ProductsService } from 'src/app/services/ProductsService';
import { CartsService } from 'src/app/services/CartsService';
import { Cart } from 'src/app/models/Cart';
import { CartData } from 'src/app/models/CartData';
import { Router } from '@angular/router';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    public CartData: CartData[];
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
        this.CartData = this.cartsService.CartData;
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
        this.CartData = userCartFromServer;
        console.log(this.CartData)
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
    }

    public showProducts(){
        this.isShowAllProduct = true;
    }

    public purchaseProduct(product){
        alert("Product been purchesed")
        this.isShowAllProduct = true;
        // this.cartItems.push(product);
        // console.log(this.cartItems);
        // this.cartItems = this.cartItems;
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
    
    quantity:number=1;
    i=1
    plus(){
      if(this.i !=10){
        this.i++;
        this.quantity=this.i;
      }
    }
    minus(){
      if(this.i !=1){
        this.i--;
        this.quantity=this.i;
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
