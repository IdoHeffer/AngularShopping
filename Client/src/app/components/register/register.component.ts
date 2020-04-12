import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';
import { UserRegisterDetails } from 'src/app/models/UserRegisteDetails';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userRegisterDetails: UserRegisterDetails;
  private usersService: UserService;

  // The router parameter is an example to a short writing of a member + it's assignment
  // private router: Router EQUIVALENT TO the following 3: 
  // 1. Member definition
  // 2. Parameter definition
  // 3. this.router = router
  constructor(usersService : UserService, private router: Router) {
      this.userRegisterDetails = new UserRegisterDetails("","");
      this.usersService = usersService;
  }

  public register(): void{
      // Creating an observable object
      // It looks like an http request had been issued BUT IT DIDN'T
      const observable = this.usersService.register(this.userRegisterDetails);

      // The method subscribe() ussues an http request to the server
      // successfulServerRequestData
      observable.subscribe(successfulServerRequestData => {
        console.log(successfulServerRequestData);                    
        this.router.navigate(["/Home"]);
      }, serverErrorResponse => { // Reaching here means that the server had failed
                  // serverErrorResponse is the object returned from the ExceptionsHandler
          alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
      }); 

  }

  ngOnInit() {
  }

}
