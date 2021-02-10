import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-rulit-user-form',
    templateUrl: './rulit-user-form.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitUserFormComponent implements OnInit {
    
    userFormData: FormGroup;

    constructor(){
        this.userFormData = this.buildUserFormData();
    }
    
    ngOnInit(): void {
        
    }

    private buildUserFormData(): FormGroup{
        const userFormFields = new FormGroup({
            name: new FormControl('Nancy', Validators.minLength(2)),
        });
        return userFormFields;
    }

    onSaveForm($event: any){

    }
    
}

