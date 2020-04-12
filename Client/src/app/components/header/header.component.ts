import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public userService :UserService,private router: Router) { }

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

}
