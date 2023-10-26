import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";

const URL = environment.backendUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static loggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.ping()
  }

  login(username: string, password: string): void {
    this.http.post<any>(URL + 'token/pair', {username, password}).subscribe(
      (response) => {
        localStorage.setItem("access_token", response['access']);
        localStorage.setItem("refresh_token", response['refresh']);
        AuthService.loggedIn = true;
      }
    )
  }

  logout() {
    localStorage.clear()
    AuthService.loggedIn = false;
  }

  ping() {
    return this.http.post(URL + 'token/verify', {token: localStorage.getItem("access_token")}).subscribe({
        next: () => {
          AuthService.loggedIn = true;
        },
        error: () => {
          AuthService.loggedIn = false;
        },
      }
    )
  }

  isLoggedIn() {
    return AuthService.loggedIn
  }
}
