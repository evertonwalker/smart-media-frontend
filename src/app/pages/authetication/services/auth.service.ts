import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PREVIOUS_URL = 'http://localhost'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginObj: { email: string, password: string }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${PREVIOUS_URL}/api/auth`, loginObj);
  }

}
