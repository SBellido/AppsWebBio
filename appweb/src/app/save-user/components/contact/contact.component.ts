import { Component, OnInit } from '@angular/core';
import { DataDbService } from './../../../core/services/db/data-db.service';
import { FormControl, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from './../../../my-dialog/my-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog ,
    private dbData: DataDbService) {
    this.contactForm = this.createFormGroup();
   }
   contactForm: FormGroup;
   private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   private stringPattern: any = /[^0-9]/;

   openDialog() {
    const dialogRef = this.dialog.open(MyDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  createFormGroup() {
    return new FormGroup({
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
        Validators.max(100)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(this.emailPattern)
      ]),
      educationLevel: new FormControl('', [
        Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onResetForm() {
    this.contactForm.reset();
  }

  onSaveForm($event) {
    $event.preventDefault();
    alert('funciona');
    if (this.contactForm.valid) {
      this.dbData.saveContact(this.contactForm.value);
      this.onResetForm();
      this.router.navigate(['test-creativity']);
      // this.openDialog();
      console.log('Valid');
    } else {
      console.log('Not valid');
    }
  }

  get name() { return this.contactForm.get('name'); }
  get lastName() { return this.contactForm.get('lastName'); }
  get age() { return this.contactForm.get('age'); }
  get email() { return this.contactForm.get('email'); }
  get educationLevel() { return this.contactForm.get('educationLevel'); }

}

