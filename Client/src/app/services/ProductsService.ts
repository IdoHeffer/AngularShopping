import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { UpdateProductModel } from '../models/UpdateProductModel';
import { AdminCreateProductDetails } from '../models/AdminCreateProductDetails';


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

    public updateProduct(updateProductModel: UpdateProductModel){
        return this.http.put<void>("/api/Products",updateProductModel);
    }

    public createProduct(adminCreateProductDetails: AdminCreateProductDetails): Observable<void> {        
        
        return this.http.post<void>("/api/Products", adminCreateProductDetails);
    }
}
