import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
    public canActiveComponent : Boolean;
    public constructor(private router: Router) {
        this.canActiveComponent =false;
    }

    public canActivate(): boolean {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if(isLoggedIn == "true") {
            this.canActiveComponent = true;
           console.log("Logged in")
            return true;
        }

        this.router.navigateByUrl("/login");
        alert("Not Logged in");
        return false;
    }

}
