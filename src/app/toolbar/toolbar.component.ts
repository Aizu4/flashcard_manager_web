import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  user: any = null;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.me().subscribe(user => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/'], {onSameUrlNavigation: 'reload'})
      .then(() => window.location.reload())
  }
}
