import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisteDetails';
import { UserForgotPasswordDetails } from '../models/UserForgotPasswordDetails';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class UserService {
 
    public userType : string;
    public FirstName : string;

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
    }
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        //  The http request will be sent after the subscribe() method will be called
        //return this.http.post<SuccessfulLoginServerResponse>("http://localhost:8080/users/login", userLoginDetails);
        this.http.post<SuccessfulLoginServerResponse>("/api/Users/login", userLoginDetails);
        return this.http.post<SuccessfulLoginServerResponse>("/api/Users/login", userLoginDetails);
    }

    public register(userRegisterDetails: UserRegisterDetails): Observable<void> {        
        
        return this.http.post<void>("/api/Users/register", userRegisterDetails);
    }

    public changePassword(userForgotPasswordDetails: UserForgotPasswordDetails ): Observable<void> {
        return this.http.post<void>("/api/Users/changePassword", userForgotPasswordDetails);
    }

    public setUserName(newuserName : string){
        this.FirstName = newuserName;
    }
    
    public getUserName() {
        return this.FirstName;
    }


    public getUserInfo(): Observable<UserRegisterDetails> {
        return this.http.get<UserRegisterDetails>("/api/Users/forClient");
    }
}
