import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  addressForm = this.fb.group({
    id: null,
    name: [null, Validators.required],
    lastName: [null, Validators.required],
    age: [null, Validators.required],
    educationLevel: [null, Validators.required],
  });

  // hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }
}
