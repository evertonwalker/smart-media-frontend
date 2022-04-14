import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'
import MatSnackService from 'src/app/services/mat-snack-service';

const PREVIOUS_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private snackBarService: MatSnackService,
    private router: Router,
    public jwtHelper: JwtHelperService) { }

  login(loginObj: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{ access_token: string }>(`${PREVIOUS_URL}/auth`, loginObj)
      .pipe(
        map((result) => {
          localStorage.setItem('jwt_token', result.access_token);
          this.router.navigateByUrl('/home');
          return true;
        }),
        catchError(error => {
          if (error.status === 404) {
            this.snackBarService.showSimpleSnack('Dados incorretos, revise-os', 10000);
            return throwError(() => new Error('Dados incorretos'));
          } else if (+error.status >= 500) {
            this.snackBarService.showSimpleSnack('A aplicação está fora do ar, tente novamente mais tarde.', 10000);
            return throwError(() => new Error('Something bad happened; please try again later.'));
          } else {
            return throwError(() => new Error('Something bad happened; please try again later.'));
          }
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt_token') || '';
    return !this.jwtHelper.isTokenExpired(token);
  }

  createAccount(registerObj: { email: string, password: string }): Observable<boolean> {
    return this.http.post(`${PREVIOUS_URL}/users`, registerObj)
      .pipe(
        switchMap(() => this.login(registerObj))
        , catchError((e: HttpErrorResponse) => {
          if (e.status === 409) {
            this.snackBarService.showSimpleSnack('E-mail já cadastrado.', 10000);
            return throwError(() => new Error('Conflict'));
          } else {
            this.snackBarService.showSimpleSnack('Aplicação fora do ar, contate o suporte.', 10000);
            return throwError(() => new Error(e.message));
          }
        })
      );
  }

  verifyToken(): Observable<boolean> {
    return this.http.get<boolean>(`${PREVIOUS_URL}/auth`)
      .pipe(map(() => true),
        catchError((err) => of(false))
      );
  }

  verifyEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${PREVIOUS_URL}/auth/verify-email`, { email })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.snackBarService.showSimpleSnack('E-mail não cadastrado', 10000);
            return throwError(() => new Error('E-mail não encontrado.'));
          } else {
            this.snackBarService.showSimpleSnack('Aplicação fora do ar, contate o suporte.', 10000);
            return throwError(() => new Error(err.message));
          }
        })
      )
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigateByUrl('login');
  }

}
