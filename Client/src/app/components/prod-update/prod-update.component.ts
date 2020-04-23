import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/ProductsService';
import { CartData } from 'src/app/models/CartData';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Location } from '@angular/common'
import { UpdateProductModel } from 'src/app/models/UpdateProductModel'



@Component({
  selector: 'app-prod-update',
  templateUrl: './prod-update.component.html',
  styleUrls: ['./prod-update.component.css']
})
export class ProdUpdateComponent implements OnInit {
  public isShowAllProduct: boolean;
  public isShowEditView: boolean;
  public cartData: CartData[];
  public products: Product[];
  public byName: string;
  public displayedProduct: Product;
  public updateProductModel : UpdateProductModel;


  constructor(private productsService: ProductsService, private router: Router, public location: Location) {
    this.products = [];
    this.byName = "";
    this.displayedProduct = this.products[0];
    this.isShowEditView =true;
    this.updateProductModel = new UpdateProductModel();
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
  }

  public isShowEditViewPanerl() {
    return this.isShowEditView =true;
  }

  public openNav( product? :Product ) {
    this.displayedProduct = product;
    document.getElementById("mySidenav").style.width = "450px";
    document.getElementById("main").style.marginLeft = "450px";
  }

  public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  public updateProduct(){
    let observable = this.productsService.updateProduct(this.updateProductModel);
    observable.subscribe(updateResponse => {
      console.log(updateResponse);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

}
