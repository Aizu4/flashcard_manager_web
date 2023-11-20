import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {Subscription} from "rxjs";

const URL = environment.backendUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string): Subscription {
    return this.http.post<any>(URL + 'token/sliding', {username, password}).subscribe(
      (response) => {
        localStorage.setItem("token", response['token']);
      }
    )
  }

  logout() {
    localStorage.clear()
  }

  me() {
    return this.http.get<any>(URL + 'users/me')
  }
}
