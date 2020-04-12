import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CategoriesService {
 
    constructor(private http: HttpClient) {}

    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>("/api/Categories");
    }
}
