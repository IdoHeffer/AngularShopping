import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { SuccessfulLoginServerResponse } from 'src/app/models/SuccessfulLoginServerResponse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public userName: string;

  constructor( public userService :UserService,private router: Router) {
    this.userName = this.userService.userName;
  }
   

  ngOnInit() {
  }

  public signOut() {
    sessionStorage.removeItem("token");
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.removeItem("userType");
    this.router.navigate(["/Home"]);
    alert("Logged out");
  }

  isShowProductsRoute() {
    let token = sessionStorage.getItem("token");
    if(token){
      return true;
    }
    return false;
  }

  public isUserAdmin() {
    let userType = sessionStorage.getItem("userType");
    if(userType=="ADMIN"){
      console.log(userType);
      return true;
    }
    return false;
  }


  isUserLoggedIn() {
    let token = sessionStorage.getItem("token");
    if(token){
      this.userName = this.userService.getUserName();
      return true;
    }
    return false;
  }

}
