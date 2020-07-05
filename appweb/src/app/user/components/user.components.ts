import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from './../../core/services/users/users.service';
import { User } from './../../core/models/user.module';

@Component({
     /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss']
})

export class UserComponent implements OnInit {

    user: User;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params.id;
            this.fetchUser(id);
            // this.user = this.usersService.getUser(id);
        });
    }

    fetchUser(id: number) {
        this.usersService.getUser(id) // hace un request, obtiene y renderiza
        .subscribe(user => {
            this.user = user;
        });
    }

    createUser() {
    const newUser: User = {
        id: 3,
        name: 'Paco',
        lastName: 'Campos',
        age: 40,
        educationLevel: 'Secundaria',
        points: 52,
    };
    this.usersService.createUser(newUser)
    .subscribe(user => {
      console.log(user);
    });
  }

  updateUser() {
    const updateUser: Partial<User> = {
        name: 'Francisco',
        age: 41,
        educationLevel: 'Universitario'
    };
    this.usersService.updateUser(3, updateUser)
    .subscribe(user => {
      console.log(user);
    });
  }

  deleteUser() {
    this.usersService.deleteUser(3)
    .subscribe(user => {
      console.log(user);
    });
  }
}

