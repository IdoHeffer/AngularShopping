import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminCreateProductDetails } from 'src/app/models/AdminCreateProductDetails';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/services/AdminUsersService';
import { NgModule } from '@angular/core';
import { ProductsService } from 'src/app/services/ProductsService';
import { CategoriesService } from 'src/app/services/CategoriesService';
import { Category } from 'src/app/models/Category';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-prod-add',
  templateUrl: './prod-add.component.html',
  styleUrls: ['./prod-add.component.css']
})
export class ProdAddComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) 
  fileUpload: ElementRef; 
  public fileName:string
  public files: any[];
  public adminCreateProductDetails: AdminCreateProductDetails;
  private productsService: ProductsService;
  private categoriesService: CategoriesService;
  public categories: Category[];
  public categoryString :string;

  constructor(productsService: ProductsService ,private router : Router, categoriesService: CategoriesService, private uploadService: UploadService) { 
    this.adminCreateProductDetails = new AdminCreateProductDetails();
      this.productsService = productsService;
      this.categoriesService= categoriesService;
      this.categories = [];
      this.categoryString ="";
      this.fileName=""
      this.files=[]
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
        this.uploadFiles();               
    }, serverErrorResponse => { // Reaching here means that the server had failed
                // serverErrorResponse is the object returned from the ExceptionsHandler
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
    }); 

  }

  onClick() {

    // Clearing the files from previous upload
    this.files = [];

    // Extracting a reference to the DOM element named #fileUpload
    const fileUpload = this.fileUpload.nativeElement; 
    fileUpload.onchange = () => {
     
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log(file);
        this.files.push({ name: file.name, data: file, inProgress: false, progress: 0 });
       this.fileName=this.files[index].name
      }
     
    };
    fileUpload.click();
 }
 
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    //chacking that the user add a file to update
    if(this.files.length!==0){
      this.files.forEach(file => {
      this.uploadFile(file);
        });
    }

  } 

 uploadFile(file) {
   const formData = new FormData();
   formData.append('file', file.data);
   file.inProgress = true;
   this.uploadService.upload(formData)
     .subscribe((event: any) => {
       if (typeof (event) === 'object') {
         
        
       }
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

