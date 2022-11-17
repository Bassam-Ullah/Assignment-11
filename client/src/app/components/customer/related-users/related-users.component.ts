import { Component, Input, OnInit } from '@angular/core';
import { UpdateUserModel, UserModel } from 'src/app/models/user.model';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-related-users',
  templateUrl: './related-users.component.html',
  styleUrls: ['./related-users.component.css'],
})
export class RelatedUsersComponent implements OnInit {
  headings: string[] = [
    'First Name',
    'Middle Name',
    'Last Name',
    'Email',
    'Phone',
    'Address',
    'Buttons',
  ];
  initialEntries: string[] = [];

  @Input() usersData: UserModel[] = [];
  @Input() customerId: string = '';
  constructor(
    private userService: UserService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {}

  onEdit(event: any) {
    for (let i = 0; i < event.path[2].cells.length - 1; i++) {
      this.initialEntries.push(event.path[2].cells[i].innerText);
    }

    event.path[2].contentEditable = true;

    //Making buttons column non-editable
    event.target.parentElement.contentEditable = false;

    event.target.parentElement.children[0].style.display = 'none';
    event.target.parentElement.children[1].style.display = 'none';
    event.target.parentElement.children[2].style.display = 'block';
    event.target.parentElement.children[3].style.display = 'block';
  }
  onSave(event: any, user: UserModel) {
    event.path[2].contentEditable = false;
    let updatedValues: UpdateUserModel = {
      firstName: event.path[2].cells[0].innerText,
      middleName: event.path[2].cells[1].innerText,
      lastName: event.path[2].cells[2].innerText,
      email: event.path[2].cells[3].innerText,
      phoneNumber: +event.path[2].cells[4].innerText,
      address: event.path[2].cells[5].innerText,
    };
    console.log(updatedValues);

    this.userService
      .updateUsers(user.id as string, updatedValues)
      .subscribe((_) => {
        this.customerService
          .getCustomer(this.customerId)
          .subscribe((customer) => {
            console.log(customer.users);

            this.usersData = customer.users as UserModel[];
          });
      });

    event.target.parentElement.children[0].style.display = 'block';
    event.target.parentElement.children[1].style.display = 'block';
    event.target.parentElement.children[2].style.display = 'none';
    event.target.parentElement.children[3].style.display = 'none';
    this.initialEntries = [];
  }
  onCancel(event: any) {
    // console.log(this.initialEntries);
    for (let i = 0; i < event.path[2].cells.length - 1; i++) {
      event.path[2].cells[i].innerText = this.initialEntries[i];
    }
    event.path[2].contentEditable = false;
    this.initialEntries = [];

    event.target.parentElement.children[0].style.display = 'block';
    event.target.parentElement.children[1].style.display = 'block';
    event.target.parentElement.children[2].style.display = 'none';
    event.target.parentElement.children[3].style.display = 'none';
  }
  onDelete(user: UserModel) {
    this.userService.deleteUser(user.id as string).subscribe((_) => {
      this.customerService
        .getCustomer(this.customerId)
        .subscribe((customer) => {
          this.usersData = customer.users as UserModel[];
        });
    });
  }
}
