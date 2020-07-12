import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit {

  // emailField: FormControl;

  constructor() {}

    // this.emailField = new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(3),
    //   Validators.maxLength(15)
    // ]);
    // this.emailField.valueChanges
    // .subscribe(value => {
    //   console.log(value);
    // });


  ngOnInit() {
  }

  // sendUserData() {
  //   if (this.emailField.valid) {
  //     console.log(this.emailField.value);
  //   }
  // }

}
