import { Component, OnInit } from '@angular/core';
import { DataDbService } from '../../../core/services/db/data-db.service';
import { FormControl, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MyDialogComponent } from '../../../my-dialog/my-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog ,
    private dbData: DataDbService) {
    this.creativeUser = this.createFormGroup();
   }
   creativeUser: FormGroup;
   private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   private stringPattern: any = /^[a-zA-ZñÑ ]*$/;

  //  openDialog() {
  //   const dialogRef = this.dialog.open(MyDialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

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
    this.creativeUser.reset();
  }

  onSaveForm($event: any) {
    $event.preventDefault();
    if (this.creativeUser.valid) {
      this.dbData.saveContact(this.creativeUser.value);
      this.onResetForm();
      this.router.navigate(['message-ok-prev-test']);
      // this.openDialog();
      console.log('Valid');
    } else {
      console.log('Not valid');
    }
  }

  get name() { return this.creativeUser.get('name'); }
  get lastName() { return this.creativeUser.get('lastName'); }
  get age() { return this.creativeUser.get('age'); }
  get email() { return this.creativeUser.get('email'); }
  get educationLevel() { return this.creativeUser.get('educationLevel'); }

}

