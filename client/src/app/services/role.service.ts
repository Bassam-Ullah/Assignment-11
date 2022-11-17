import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleModel } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<RoleModel[]>(`${this.apiUrl}/roles`);
  }
}
