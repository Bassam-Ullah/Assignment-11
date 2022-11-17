import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  usersData: UserModel[] = [];
  renderTable: boolean = false;
  loadButtonContent: string = 'Load Data';
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onLoadData() {
    this.renderTable = true;
    this.loadButtonContent = 'Refresh Data';
    this.userService.getUsers().subscribe((Users) => {
      this.usersData = Users;
      console.log(Users);
    });
  }
}
