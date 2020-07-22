import { Component, OnInit, Input } from '@angular/core';
import { DataDbService } from '../../../core/services/db/data-db.service';
import { FormControl, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { CreativeUser } from './../../../core/models/creative-user.interface';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

// @Input('formControlName')

export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    private dbData: DataDbService) {
    this.dataCreativeUser = this.createDataUser();
  }

  creativeUser: CreativeUser = {
    name: '',
    lastName: '',
    age: 0,
    email: '',
    educationLevel: '',
    proposal: ['']
  };

  dataCreativeUser: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private stringPattern: any = /^[a-zA-ZñÑ]*$/;

  createDataUser() {
    const formData = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(this.stringPattern)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(this.stringPattern)
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(10),
        Validators.max(100),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(this.emailPattern)
      ]),
      educationLevel: new FormControl('', [
        Validators.required])
    });
    return formData;
  }

  ngOnInit(): void {
  }

  onResetForm() {
    this.dataCreativeUser.reset();
  }

  onSaveForm($event: any) {
    $event.preventDefault();
    if (this.dataCreativeUser.valid) {
      console.log('Valid');
      console.log(this.dataCreativeUser.value);
      localStorage.setItem('creative-user', this.dataCreativeUser.value);
      this.onResetForm();
      this.router.navigate(['message-ok-prev-test']);
    } else {
      console.log('Not valid');
    }
  }


  // setDataInStorage(formData: FormGroup) {
  //   localStorage.setItem('name', formData.value);
  //   this.creativeUser.name = this.dataCreativeUser.get('name');
  //   this.creativeUser.lastName = this.dataCreativeUser.get('lastName');
  //   this.creativeUser.age = this.dataCreativeUser.get('age');
  //   this.creativeUser.age = this.dataCreativeUser.get('email');
  //   this.creativeUser.educationLevel = this.dataCreativeUser.get('educationLevel');
  //   return this.creativeUser;
  // }

  get name() { return this.dataCreativeUser.get('name'); }
  get lastName() { return this.dataCreativeUser.get('lastName'); }
  get age() { return this.dataCreativeUser.get('age'); }
  get email() { return this.dataCreativeUser.get('email'); }
  get educationLevel() { return this.dataCreativeUser.get('educationLevel'); }

}

