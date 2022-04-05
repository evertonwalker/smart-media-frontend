import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable, of } from 'rxjs';
import MatSnackService from 'src/app/services/mat-snack-service';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router, private snackService: MatSnackService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.auth.verifyToken()
            .pipe(first())
            .pipe(map(authResult =>
                !authResult ? this.redirectAndShowMessage() : true,
            ));
    }

    private redirectAndShowMessage(): boolean {
        this.snackService.showSimpleSnack('Faça o login novamente', 10000);
        this.router.navigate(['login']);
        return false;
    }

}