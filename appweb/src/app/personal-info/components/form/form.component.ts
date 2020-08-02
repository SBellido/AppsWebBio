import { Component, OnInit, Input } from '@angular/core';
import { DataDbService } from '../../../core/services/db/data-db.service';
import { FormControl, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
@Input('formControlName')

export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    private dbData: DataDbService) {
    this.dataUser = this.getDataUser();
  }

  dataUser: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private stringPattern: any = /^[a-zA-ZñÑáéíóú ]*$/;

  getDataUser() {
    const formData = new FormGroup({
      nameLastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
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
        Validators.required
      ]),
      school: new FormControl('', [
        // Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(this.stringPattern)
      ]),
      year: new FormControl('', [
        // Validators.required,
      ]),
      course: new FormControl('', [
        // Validators.required,
      ]),
    });
    console.log(formData.value);

    // this.setDataInStorage(formData);
    return formData;
  }

  ngOnInit(): void {
    // localStorage.clear();
    console.log(this.dataUser.value);
    localStorage.removeItem('creative-user');
  }

  onResetForm() {
    this.dataUser.reset();
  }

  onSaveForm($event: any) {
    $event.preventDefault();
    if (this.dataUser.valid) {
      console.log('Valid');
      console.log(this.dataUser.value);
      localStorage.setItem('creative-user', JSON.stringify(this.dataUser.value));
      this.onResetForm();
      this.router.navigate(['message-ok-prev-test']);
    } else {
      console.log('Not valid');
    }
  }

  // setDataInStorage(formData: FormGroup) {
  //   localStorage.setItem('nameLastName', formData.value(this.nameLastName));
  //   localStorage.setItem('age', formData.value(this.age));
  // }

  get nameLastName() { return this.dataUser.get('nameLastName'); }
  get age() { return this.dataUser.get('age'); }
  get email() { return this.dataUser.get('email'); }
  get educationLevel() { return this.dataUser.get('educationLevel'); }
  get school() { return this.dataUser.get('school'); }
  get year() { return this.dataUser.get('year'); }
  get course() { return this.dataUser.get('course'); }

}

