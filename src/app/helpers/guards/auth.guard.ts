import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('usrrole') === btoa('employer') || localStorage.getItem('usrrole') === btoa('user')) {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }
}
