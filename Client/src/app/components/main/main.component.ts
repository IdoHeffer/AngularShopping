import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersService } from 'src/app/services/OrdersService'
import { WebsiteDetails } from 'src/app/models/WebsiteDetails';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    public websiteDetails: WebsiteDetails;
    public userLoginDetails: UserLoginDetails;
    private usersService: UserService;
    public ordersService: OrdersService;

    // The router parameter is an example to a short writing of a member + it's assignment
    // private router: Router EQUIVALENT TO the following 3: 
    // 1. Member definition
    // 2. Parameter definition
    // 3. this.router = router
    constructor(usersService: UserService, private router: Router, ordersService: OrdersService) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
        this.ordersService = ordersService;
        this.websiteDetails = new WebsiteDetails(15);
    }

    public login(): void {
        // Creating an observable object
        // It looks like an http request had been issued BUT IT DIDN'T
        const observable = this.usersService.login(this.userLoginDetails);

        // The method subscribe() ussues an http request to the server
        // successfulServerRequestData
        observable.subscribe(successfulServerRequestData => {
            console.log(successfulServerRequestData);

            sessionStorage.setItem("token", JSON.stringify(successfulServerRequestData.token));
            sessionStorage.setItem("userType", JSON.stringify(successfulServerRequestData.userType));
            sessionStorage.setItem("isLoggedIn", "true")
            this.usersService.userType = JSON.stringify(successfulServerRequestData.userType);
            
            if (this.usersService.userType == "CUSTOMER") {
                this.router.navigate(["/Products"]);
            }

            if (successfulServerRequestData.userType == "ADMIN") {
                this.router.navigate(["/Admin"]);
            }

            // if (successfulServerRequestData.userType == "COMPANY") {
            //     this.router.navigate(["/Company"]);
            // }
        }, serverErrorResponse => { // Reaching here means that the server had failed
            // serverErrorResponse is the object returned from the ExceptionsHandler
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
        });

    }

    ngOnInit() {
        let observable = this.ordersService.getNumberOfAllOrders();
        observable.subscribe(ordersNumber => {
            this.websiteDetails.AmountOfOrders = JSON.stringify(ordersNumber.AmountOfOrders) ;
            console.log(1)
            console.log(ordersNumber)
        }, error => {
            alert('Failed to get Number of Orders ' + JSON.stringify(error));
        });


    }

}
