import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customer.model';
import { RoleModel } from 'src/app/models/role.model';
import { CustomerService } from 'src/app/services/customer.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  addUserForm!: FormGroup;
  submitButtonClicked: boolean = false;
  roles: RoleModel[] = [];
  customers: CustomerModel[] = [];

  constructor(
    private roleService: RoleService,
    private customerService: CustomerService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });

    this.addUserForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      middleName: new FormControl(null),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      roleId: new FormControl(null, Validators.required),
      customerId: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.addUserForm.status === 'INVALID') {
      this.submitButtonClicked = true;
      return;
    } else {
      let newUser = this.addUserForm.value;
      if (newUser['middleName'] == null) {
        newUser['middleName'] = '';
      }
      newUser['customerId'] = +newUser.customerId;
      newUser['roleId'] = +newUser.roleId;
      console.log(newUser);

      this.submitButtonClicked = false;

      this.userService.postUser(newUser).subscribe(
        (_) => {
          alert(`\nNew User created Successfully ! Log in to see Changes !`);
          this.router.navigateByUrl('');
        },
        (err) => {
          alert('Some error occurred,try again with different details');
        }
      );
    }
  }
}
