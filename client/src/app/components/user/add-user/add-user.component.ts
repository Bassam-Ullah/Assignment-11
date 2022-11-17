import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer.model';
import { RoleModel } from 'src/app/models/role.model';
import { CustomerService } from 'src/app/services/customer.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  showAddForm: boolean = false;
  submitButtonClicked: boolean = false;
  showAddButton: boolean = true;
  roles: RoleModel[] = [];
  customers: CustomerModel[] = [];

  @Output() onSubmitUser = new EventEmitter();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private customerService: CustomerService
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
      this.showAddForm = false;
      this.showAddButton = true;

      this.userService.postUser(newUser).subscribe((_) => {
        this.addUserForm.reset();
        this.onSubmitUser.emit();
      });
    }
  }
}
