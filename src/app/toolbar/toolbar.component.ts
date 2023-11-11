import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  user: any = null;

  constructor(public authService: AuthService) {
    this.authService.me().subscribe(user => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
    this.user = null;
    window.location.reload();
  }
}
