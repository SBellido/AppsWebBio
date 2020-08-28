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
  users: any;

  constructor(
    private router: Router,
    private dbData: DataDbService,
    ) {
      this.dataUser = this.getDataUser();
  }

  dataUser: FormGroup;
  
  private stringPattern: any = /^[a-zA-ZñÑáéíóú ]*$/;
  private stringAndNumberPattern: any = /^[a-zA-ZñÑáéíóú 0-9 ]*$/;
  private characterPattern: any = /[A-Za-z]/;
  // private characterPattern: any = /^[A-Z]+$/i;
  getDataUser() {
    const formData = new FormGroup({
      nameLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(this.stringPattern)
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(10),
        Validators.max(100),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(this.stringAndNumberPattern)
      ]),
      educationLevel: new FormControl('', [
        Validators.required
      ]),
      educationStatus: new FormControl('', []),
      school: new FormControl('', [
        Validators.maxLength(40),
        Validators.pattern(this.stringAndNumberPattern)
      ]),
      degree: new FormControl('', [
        Validators.maxLength(40),
        Validators.pattern(this.stringPattern)
      ]),
      year: new FormControl('', []),
      grade: new FormControl('', []),
      course: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.pattern(this.characterPattern)
      ]),
    });
    console.log(formData.value);
    return formData;
  }

  ngOnInit(): void {
    // localStorage.clear();
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

  get nameLastName() { return this.dataUser.get('nameLastName'); }
  get age() { return this.dataUser.get('age'); }
  get city() { return this.dataUser.get('city'); }
  get educationLevel() { return this.dataUser.get('educationLevel'); }
  get educationStatus() { return this.dataUser.get('educationStatus'); }
  get school() { return this.dataUser.get('school'); }
  get degree() { return this.dataUser.get('degree'); }
  get year() { return this.dataUser.get('year'); }
  get grade() { return this.dataUser.get('grade'); }
  get course() { return this.dataUser.get('course'); }

}
