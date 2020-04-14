import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { CartData } from '../models/CartData';
import { Product } from '../models/Product';
import { CartItem } from 'src/app/models/CartItem';

@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CartsService {
    public cartItem : CartItem;
    public userCart : Cart[];
    public CartData: CartData[];

    constructor(private http: HttpClient) {}

    public getUserCart(): Observable<CartData[]> {
        return this.http.get<CartData[]>("/api/Carts/usercart");
    }

    public getAllCartItems(id): Observable<Product[]> {
        return this.http.get<Product[]>("/api/CartItems/"+id);
    }

    public purchaseProduct(cartItem : CartItem,) : Observable<void> {
        return this.http.post<void>("/api/CartItems", cartItem);
    }
    
}
