import { Component, OnInit } from '@angular/core';
import { UserForgotPasswordDetails } from 'src/app/models/UserForgotPasswordDetails';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  public userForgotPasswordDetails: UserForgotPasswordDetails;
  private usersService: UserService;

  // The router parameter is an example to a short writing of a member + it's assignment
  // private router: Router EQUIVALENT TO the following 3: 
  // 1. Member definition
  // 2. Parameter definition
  // 3. this.router = router
  constructor(usersService : UserService, private router: Router) {
      this.userForgotPasswordDetails = new UserForgotPasswordDetails("","");
      this.usersService = usersService;
  }

  public changePassword(): void{
      // Creating an observable object
      // It looks like an http request had been issued BUT IT DIDN'T
      const observable = this.usersService.changePassword(this.userForgotPasswordDetails);

      // The method subscribe() ussues an http request to the server
      // successfulServerRequestData
      observable.subscribe(successfulServerRequestData => {
        console.log(successfulServerRequestData);                    
        this.router.navigate(["/Home"]);
      }, serverErrorResponse => { // Reaching here means that the server had failed
                  // serverErrorResponse is the object returned from the ExceptionsHandler
          console.log("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
      }); 

  }
  ngOnInit() {
  }

}
