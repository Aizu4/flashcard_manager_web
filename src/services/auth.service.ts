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

  }

  login(username: string, password: string): void {
    this.http.post<any>(URL + 'token/sliding', {username, password}).subscribe(
      (response) => {
        localStorage.setItem("token", response['token']);
        AuthService.loggedIn = true;
      }
    )
  }

  logout() {
    localStorage.clear()
    AuthService.loggedIn = false;
  }

  isLoggedIn() {
    return AuthService.loggedIn
  }
}
