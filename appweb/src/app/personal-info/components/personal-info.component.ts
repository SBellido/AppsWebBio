import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

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
