import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm!: FormGroup;
  showAddForm: boolean = false;
  showAddButton: boolean = true;
  @Output() onSubmitCustomer = new EventEmitter();
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.addCustomerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    let newCustomer = this.addCustomerForm.value;

    newCustomer;
    this.showAddForm = false;
    this.showAddButton = true;

    this.customerService.postCustomer(newCustomer).subscribe((_) => {
      this.addCustomerForm.reset();
      this.onSubmitCustomer.emit();
    });
  }
}
