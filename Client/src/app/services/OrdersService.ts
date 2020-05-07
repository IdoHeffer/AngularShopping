import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebsiteDetails } from '../models/WebsiteDetails';
import { CheckOutDetails } from '../models/CheckOutDetails';
import { Order } from '../models/Order';
import { CartData } from '../models/CartData';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class OrdersService {
 
    public AmountOfOreders : number;
    public CartData: CartData[];

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
    }
    public getNumberOfAllOrders(): Observable<WebsiteDetails> {
        return this.http.get<WebsiteDetails>("/api/Orders/numberoforders");
    }

    public placeOrder(checkOutDetails : CheckOutDetails): Observable<void> {
        return this.http.post<void>("/api/Orders", checkOutDetails);
    }

    public myOrders(): Observable<Order[]> {
        return this.http.get<Order[]>("/api/Orders/myorders/allorders");
    } 

    public closedOrdersItems(cartID) : Observable<CartData[]> {
        return this.http.get<CartData[]>("/api/Orders/Closedorder/"+cartID);
    }

}
