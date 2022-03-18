import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, first, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.auth.verifyToken()
            .pipe(first())
            .pipe(map(authResult =>
                !authResult ? false : true,
            ));
    }
}