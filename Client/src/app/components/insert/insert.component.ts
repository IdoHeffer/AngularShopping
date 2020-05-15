import { Component, OnInit } from '@angular/core';
import { AdminCreateUserDetails } from 'src/app/models/AdminCreateUserDetails';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/services/AdminUsersService';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  public adminCreateUserDetails: AdminCreateUserDetails;
  private adminUserService: AdminUserService;

  // The router parameter is an example to a short writing of a member + it's assignment
  // private router: Router EQUIVALENT TO the following 3: 
  // 1. Member definition
  // 2. Parameter definition
  // 3. this.router = router
  constructor(adminUsersService : AdminUserService, private router: Router) {
      this.adminCreateUserDetails = new AdminCreateUserDetails();
      this.adminUserService = adminUsersService;
  }

  public register(): void{
      // Creating an observable object
      // It looks like an http request had been issued BUT IT DIDN'T
      const observable = this.adminUserService.createUser(this.adminCreateUserDetails);

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
  }

}
