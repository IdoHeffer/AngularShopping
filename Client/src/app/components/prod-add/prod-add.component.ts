import { Component, OnInit } from '@angular/core';
import { AdminCreateProductDetails } from 'src/app/models/AdminCreateProductDetails';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/services/AdminUsersService';
import { NgModule } from '@angular/core';
import { ProductsService } from 'src/app/services/ProductsService';
import { CategoriesService } from 'src/app/services/CategoriesService';
import { Category } from 'src/app/models/Category';


@Component({
  selector: 'app-prod-add',
  templateUrl: './prod-add.component.html',
  styleUrls: ['./prod-add.component.css']
})
export class ProdAddComponent implements OnInit {
  public adminCreateProductDetails: AdminCreateProductDetails;
  private productsService: ProductsService;
  private categoriesService: CategoriesService;
  public categories: Category[];
  public categoryString :string;

  constructor(productsService: ProductsService ,private router : Router, categoriesService: CategoriesService) { 
    this.adminCreateProductDetails = new AdminCreateProductDetails();
      this.productsService = productsService;
      this.categoriesService= categoriesService;
      this.categories = [];
      this.categoryString ="";
  }

  public createNewProduct(): void{
    // Creating an observable object
    // It looks like an http request had been issued BUT IT DIDN'T
    this.adminCreateProductDetails.CategoryID = parseInt(this.categoryString);
    const observable = this.productsService.createProduct(this.adminCreateProductDetails);

    // The method subscribe() ussues an http request to the server
    // successfulServerRequestData
    observable.subscribe(successfulServerRequestData => {
        console.log(successfulServerRequestData);                    
    }, serverErrorResponse => { // Reaching here means that the server had failed
                // serverErrorResponse is the object returned from the ExceptionsHandler
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
    }); 

}


  ngOnInit() {
    let observableCategories = this.categoriesService.getAllCategories();
    observableCategories.subscribe(CategoriesList => {
      this.categories = CategoriesList;
      console.log(1)
      console.log(CategoriesList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

}

