import { Component, OnInit } from '@angular/core';
import { DataDbService } from './../../../core/services/db/data-db.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private dbData: DataDbService) {
    this.contactForm = this.createFormGroup();
   }

  contactForm: FormGroup;

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      age: new FormControl(''),
      email: new FormControl(''),
      educationLevel: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onResetForm() {
    this.contactForm.reset();
  }

  onSaveForm() {
    this.dbData.saveContact(this.contactForm.value);
  }

}

