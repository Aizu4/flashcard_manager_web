import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "admin";
  password: string = "admin";
  loginValid: boolean = true;

  constructor(private auth: AuthService, private router: Router) {
  }

  onSubmit() {
    this.auth.login(this.email, this.password).add(() => {
      this.router.navigate(['/']);
    });
  }
}
