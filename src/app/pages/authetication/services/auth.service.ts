import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'

const PREVIOUS_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
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
            this.snackBar.open('Dados incorretos, revise-os', 'X', {
              duration: 5000
            });
            return throwError(() => new Error('Dados incorretos'));
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

  verifyToken(): Observable<boolean> {
    return this.http.get<boolean>(`${PREVIOUS_URL}/auth`)
      .pipe(map(() => true),
        catchError((err) => of(false))
      );
  }

}
