import { Injectable } from '@angular/core';

import { User } from 'src/app/core/models/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[];

  constructor() { }

  getAllUsers() {
    return this.users;
  }
  getUser(id: string) {
    return this.users.find(item => id === item.id);
  }
}
