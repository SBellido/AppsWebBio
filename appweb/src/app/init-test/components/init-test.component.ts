import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-init-test',
  templateUrl: './init-test.component.html',
  styleUrls: ['./init-test.component.scss']
})
export class InitTestComponent implements OnInit {

  emailField: FormControl;

  constructor() {
    this.emailField = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]);
    // this.emailField.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });
  }

  ngOnInit() {
  }

  sendUserData() {
    if (this.emailField.valid) {
      console.log(this.emailField.value);
    }
  }

}
