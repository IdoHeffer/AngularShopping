import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/ProductsService';
import { Product } from 'src/app/models/Product';
import { ProductsPipeByName } from 'src/app/pipes/ProductsPipeByName'


@Component({
  selector: 'app-bakery',
  templateUrl: './bakery.component.html',
  styleUrls: ['./bakery.component.css']
})

export class BakeryComponent implements OnInit {
  public products: Product[];
  public isShowAllProduct: boolean;
  public byName: string;
  public displayedProduct: Product;
  public displayedImg: Product;
  public cartItems:Product[];

  
  constructor(private productsService: ProductsService) {
    this.products = [];
    this.byName = "";
    this.displayedProduct;
    this.cartItems = productsService.cartItems;
  }

  ngOnInit() {
    this.isShowAllProduct = true;
    let observable = this.productsService.getAllCategoriesProducts(6);
    observable.subscribe(productsList => {
      this.products = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }
  public showProduct(product: Product) {
    // Debugging using printing the object value in the browser's console
    console.log(product);
    this.isShowAllProduct = false;
    this.displayedProduct = product;
    this.displayedImg = product;
  }

  public showProducts() {
    this.isShowAllProduct = true;
  }

  public purchaseProduct(product: Product) {
    alert("Product been purchesed");
    this.cartItems.push(product);
    
    console.log(this.cartItems);
    this.isShowAllProduct = true;
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

}
