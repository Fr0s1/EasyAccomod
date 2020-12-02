import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentAccount = this.authService.currentUserValue

        console.log(currentAccount)
        if (currentAccount.token) {
            if (route.data.roles.includes(currentAccount.accountType)) {
                return true
            }

            this.router.navigate(['/login'])
            return false
        }

        this.router.navigate(['/login'])
        return false
    }
}