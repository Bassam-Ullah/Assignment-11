import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

import { NewUserModel, UpdateUserModel, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  loginUser(credentials: { username: string; password: string }) {
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  getUsers(): Observable<UserModel[]> {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.get<UserModel[]>(`${this.apiUrl}/users`, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }

  postUser(user: NewUserModel) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUsers(id: string, user: UpdateUserModel) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.patch(`${this.apiUrl}/users/${id}`, user, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }

  deleteUser(id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }
}
