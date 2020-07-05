import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../../../core/models/user.module';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient // inyecta dependencia
  ) { }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.firebase.apiKey}/users/`);
  }
  getUser(id: number) {
    return this.http.get<User>(`${environment.firebase.apiKey}/users/${id}`);
  }
  createUser(user: User) {
    return this.http.post(`${environment.firebase.apiKey}/users`, user);
  }
  updateUser(id: number, changes: Partial<User>) { // cambio parte del usuario, opcional según la qeu se envíe
    return  this.http.put(`${environment.firebase.apiKey}/users/${id}`, changes);
  }
  deleteUser(id: number) {
    return this.http.delete(`${environment.firebase.apiKey}/users/${id}`);
  }
}
