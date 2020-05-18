import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersService } from 'src/app/services/OrdersService'
import { WebsiteDetails } from 'src/app/models/WebsiteDetails';
import { ProductsService } from 'src/app/services/ProductsService';

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
    public productsService : ProductsService;
    public numberOfproducts: number;

    // The router parameter is an example to a short writing of a member + it's assignment
    // private router: Router EQUIVALENT TO the following 3: 
    // 1. Member definition
    // 2. Parameter definition
    // 3. this.router = router
    constructor(usersService: UserService, private router: Router, ordersService: OrdersService,productsService : ProductsService) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
        this.ordersService = ordersService;
        this.productsService = productsService;
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
            sessionStorage.setItem("isLoggedIn", "true")
            sessionStorage.setItem("userType", JSON.stringify(successfulServerRequestData.userType));
            this.usersService.userType = successfulServerRequestData.userType;
            this.usersService.FirstName = successfulServerRequestData.userName;
            
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
            alert("Login Failed ! UserName Or Password are inncorrect");
        });

    }

    ngOnInit() {
        let observable = this.ordersService.getNumberOfAllOrders();
        observable.subscribe(ordersNumber => {
            this.websiteDetails.AmountOfOrders = ordersNumber[0].numberoforders ;
            console.log(1)
            console.log(ordersNumber)
        }, error => {
            console.log('Failed to get Number of Orders ' + JSON.stringify(error));
        });
    }

}
