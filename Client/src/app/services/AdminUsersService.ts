import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class AdminUserService {

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
    }
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        return this.http.post<SuccessfulLoginServerResponse>("/api/users/login", userLoginDetails);
    }

    public createUser(userLoginDetails: UserLoginDetails): Observable<void> {        
        
        return this.http.post<void>("/api/Admin", userLoginDetails);
    }
}
