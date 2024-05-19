import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
interface Token {
  exp: number;
  user: {
    id: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private api = 'http://evernote24.s2110456009.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password,
    });
  }
  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem('userId'));
  }
  public setSessionStorage(token: string) {
    const decodedToken = jwtDecode(token) as Token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', decodedToken.user.id);
  }
  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }
  public isLoggedIn() {
    if (sessionStorage.getItem('token')) {
      let token: string = <string>sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
