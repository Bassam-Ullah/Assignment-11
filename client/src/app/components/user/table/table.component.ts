import { Component, Input, OnInit } from '@angular/core';
import { UpdateUserModel, UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  headings: string[] = [
    'First Name',
    'Middle Name',
    'Last Name',
    'Email',
    'Phone',
    'Address',
    'Role',
    'Customer Name',
    'Buttons',
  ];
  @Input() usersData: UserModel[] = [];
  initialEntries: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onAddUser() {
    this.userService
      .getUsers()
      .subscribe((updatedUsers) => (this.usersData = updatedUsers));
  }

  onEdit(event: any) {
    for (let i = 0; i < event.path[2].cells.length - 1; i++) {
      this.initialEntries.push(event.path[2].cells[i].innerText);
    }

    event.path[2].contentEditable = true;

    //Making buttons column non-editable
    event.target.parentElement.contentEditable = false;

    //Making Role column non-editale
    event.target.parentElement.parentElement.children[6].contentEditable =
      false;
    //Making the Customers Column non-editable
    event.target.parentElement.parentElement.children[7].contentEditable =
      false;

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
        this.userService.getUsers().subscribe((users) => {
          this.usersData = users;
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
      this.userService.getUsers().subscribe((users) => {
        this.usersData = users;
      });
    });
  }
}
