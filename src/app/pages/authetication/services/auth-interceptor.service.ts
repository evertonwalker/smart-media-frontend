import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import MatSnackService from 'src/app/services/mat-snack-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private snackService: MatSnackService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    localStorage.removeItem('jwt_token');
                    this.snackService.showSimpleSnack('Faça o login novamente', 10000);
                    this.router.navigate(['login']);
                }
            }));
    }
}