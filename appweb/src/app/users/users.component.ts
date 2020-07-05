import { Component, OnInit } from '@angular/core';

import { User } from './../core/models/user.module';
import { UsersService } from './../core/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService // inyecta dependencia
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.getAllUsers() // devuelve un observable de tipo object
    .subscribe(users => {
      this.users = users; // asigna a la variable el array que trae el service
    });
  }

}
