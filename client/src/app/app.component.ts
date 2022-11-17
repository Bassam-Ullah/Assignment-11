import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private cookieService: CookieService, private router: Router) {}

  isLoggedIn() {
    const id = this.cookieService.get('id');
    if (!id) {
      return false;
    } else {
      return true;
    }
  }

  logOut() {
    this.cookieService.remove('id');
    this.router.navigateByUrl('');
  }
}
