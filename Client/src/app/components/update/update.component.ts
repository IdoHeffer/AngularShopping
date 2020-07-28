import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/Product';
import { CartData } from 'src/app/models/CartData';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Location } from '@angular/common'
import { NgModule } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { UpdateProductModel } from 'src/app/models/UpdateProductModel'
import { UserRegisterDetails } from 'src/app/models/UserRegisteDetails';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public isShowAllProduct: boolean;
  public isShowEditView: boolean;
  public cartData: CartData[];
  public users: User[];
  public byName: string;
  public displayedUser: User;
  public updateUserModel : User;


  constructor(private userService: UserService, private router: Router, public location: Location) {
    this.users = [];
    this.byName = "";
    this.displayedUser;
    this.isShowEditView =true;
    this.updateUserModel = new User();
   }

  ngOnInit() {
    this.isShowAllProduct = true;
    let observable = this.userService.getAllUsers();
    observable.subscribe(productsList => {
      this.users = productsList;
      console.log(1)
      console.log(productsList)
    }, error => {
      console.log('Failed to get products ' + JSON.stringify(error));
    });
  }

  public isShowEditViewPanerl() {
    return this.isShowEditView =true;
  }

  public openNav( user? :User ) {
    this.displayedUser = user;
    this.updateUserModel=user
  
    document.getElementById("mySidenav").style.width = "370px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  public closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  public updateUser(){

    console.log(this.updateUserModel)
    let observable = this.userService.updateUser(this.updateUserModel);
    observable.subscribe(updateResponse => {
      console.log(updateResponse);
    }, error => {
     console.log('Failed to Update User ' + JSON.stringify(error));
    });
  }

}
