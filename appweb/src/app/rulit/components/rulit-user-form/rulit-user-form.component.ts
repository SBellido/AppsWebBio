import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// Allows use of ngif in template
import { CommonModule } from '@angular/common';  


import { RulitUserService } from "../../bits/RulitUserService";


@Component({
    selector: 'app-rulit-user-form',
    templateUrl: './rulit-user-form.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitUserFormComponent implements OnInit {
    
    userFormData: FormGroup;

    constructor( private userService: RulitUserService ){
        this.userFormData = this.buildUserFormData();
    }
    
    ngOnInit(): void {
        
    }

    private buildUserFormData(): FormGroup{
        const userFormFields = new FormGroup({
            name: new FormControl('Nancy', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(30)]
            ),
            email: new FormControl('email@ejemplo.com',[
                Validators.required,
                Validators.email
            ])
        });
        return userFormFields;
    }

    get name(){
        return this.userFormData.get('name');
    }
    
    get email(){
        return this.userFormData.get('email');
    }

    onSaveForm($event: any){
        if ( this.userFormData.valid ) {
             
            console.log("save form");
        } else {
            console.log("error in form");
        }
    }
    
}

