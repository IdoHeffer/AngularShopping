import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../models/Friend';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class FriendsService {
 
    constructor(private http: HttpClient) {}

    public getAllFriends(): Observable<Friend[]> {
        return this.http.get<Friend[]>("/api/friends");
    }
}
