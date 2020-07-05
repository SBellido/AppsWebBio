import { Injectable } from '@angular/core';

import { User } from 'src/app/core/models/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 users: User[] = [
    {
        id: 1,
        name: 'Rodolfo',
        lastName: 'Chacón',
        age: 15,
        educationLevel: 'bla bla bla bla bla',
        points: 45
    },
    {
        id: 2,
        name: 'Francisco',
        lastName: 'Perez Esquivel',
        age: 11,
        educationLevel: 'bla bla bla bla bla',
        points: 30
    },
  ];

  constructor() { }

  getAllUsers() {
    return this.users;
  }
  getUser(id: number) {
    return this.users.find(item => id === item.id);
  }
}
