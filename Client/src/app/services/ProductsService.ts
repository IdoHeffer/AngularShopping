import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class ProductsService {
    public cartItems:Product[];

    constructor(private http: HttpClient) {}

    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>("/api/Products");
    }

    public getAllCategoriesProducts(id): Observable<Product[]> {
        return this.http.get<Product[]>("/api/Categories/"+id);
    }
}
