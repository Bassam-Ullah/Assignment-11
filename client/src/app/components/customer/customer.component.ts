import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/models/customer.model';
import { UserModel } from 'src/app/models/user.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customersData: CustomerModel[] = [];
  headings: string[] = [
    'Name',
    'Website',
    'Address',
    'Buttons',
    'Toggle Associated Users',
  ];
  relatedUsers: UserModel[] = [];
  customerId: string = '';
  initialEntries: string[] = [];
  showRelatedUsers = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customersData) => {
      this.customersData = customersData;
      // console.log(this.customersData);
    });
  }

  onEdit(event: any) {
    for (let i = 0; i < event.path[2].cells.length - 1; i++) {
      this.initialEntries.push(event.path[2].cells[i].innerText);
    }

    event.path[2].contentEditable = true;

    //Making buttons column non-editable
    event.target.parentElement.contentEditable = false;

    //Making the toggle users column non-editable
    event.target.parentElement.parentElement.children[4].contentEditable =
      false;

    event.target.parentElement.children[0].style.display = 'none';
    event.target.parentElement.children[1].style.display = 'none';
    event.target.parentElement.children[2].style.display = 'block';
    event.target.parentElement.children[3].style.display = 'block';
  }
  onSave(event: any, customer: CustomerModel) {
    event.path[2].contentEditable = false;
    let updatedValues: CustomerModel = {
      name: event.path[2].cells[0].innerText,
      website: event.path[2].cells[1].innerText,
      address: event.path[2].cells[2].innerText,
    };
    // console.log(updatedValues);

    this.customerService
      .updateCustomers(customer.id as string, updatedValues)
      .subscribe((_) => {
        this.customerService.getCustomers().subscribe((customers) => {
          this.customersData = customers;
        });
      });

    event.target.parentElement.children[0].style.display = 'block';
    event.target.parentElement.children[1].style.display = 'block';
    event.target.parentElement.children[2].style.display = 'none';
    event.target.parentElement.children[3].style.display = 'none';
    this.initialEntries = [];
  }
  onCancel(event: any) {
    event.target.parentElement.children[0].style.display = 'block';
    event.target.parentElement.children[1].style.display = 'block';
    event.target.parentElement.children[2].style.display = 'none';
    event.target.parentElement.children[3].style.display = 'none';
    for (let i = 0; i < event.path[2].cells.length - 2; i++) {
      event.path[2].cells[i].innerText = this.initialEntries[i];
    }
    event.path[2].contentEditable = false;
    this.initialEntries = [];
  }

  onDelete(customer: CustomerModel) {
    this.customerService
      .deleteCustomer(customer.id as string)
      .subscribe((_) => {
        this.customerService.getCustomers().subscribe((customers) => {
          this.customersData = customers;
        });
      });
  }
  onShowUsers(customer: CustomerModel) {
    this.relatedUsers = customer.users as UserModel[];
    this.customerId = customer.id!;
    // console.log(customer.users);
    this.showRelatedUsers = true;
  }
  onHideUsers() {
    this.showRelatedUsers = false;
  }
  onAddCustomer() {
    this.customerService
      .getCustomers()
      .subscribe((updatedCustomers) => (this.customersData = updatedCustomers));
  }
}
