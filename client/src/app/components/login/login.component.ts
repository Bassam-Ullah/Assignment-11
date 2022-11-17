import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitButtonClicked: boolean = false;

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  onSubmit() {
    if (this.loginForm.status === 'INVALID') {
      this.submitButtonClicked = true;
      return;
    } else {
      console.log(this.loginForm.value);
      this.userService.loginUser(this.loginForm.value).subscribe(
        (response: any) => {
          this.cookieService.put('id', response.token);
          this.router.navigateByUrl('/users');
        },
        (err) => {
          alert('Invalid Credentials');
          console.log(err);
        }
      );
    }
  }
}
