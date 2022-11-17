import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(`${this.apiUrl}/customers`);
  }

  getCustomer(id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.get<CustomerModel>(`${this.apiUrl}/customers/${id}`, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }

  postCustomer(customer: CustomerModel) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.post(`${this.apiUrl}/customers`, customer, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }
  updateCustomers(id: string, customer: CustomerModel) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.patch(`${this.apiUrl}/customers/${id}`, customer, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }
  deleteCustomer(id: string) {
    const cookieUserId = this.cookieService.get('id');
    if (!cookieUserId) {
      alert('Login Required');
      this.router.navigateByUrl('');
    }
    return this.http.delete(`${this.apiUrl}/customers/${id}`, {
      headers: { Authorization: `Bearer ${cookieUserId}` },
    });
  }
}
