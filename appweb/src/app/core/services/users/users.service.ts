import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';

import { User } from './../../../core/models/user.module';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient, // inyecta dependencia
    private af: AngularFireDatabase
  ) { }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.firebase.databaseURL}/users/`);
  }
  getUser(id: number) {
    return this.http.get<User>(`${environment.firebase.databaseURL}/users/${id}`);
  }
  createUser(user: User) {
    return this.http.post(`${environment.firebase.databaseURL}/users`, user);
  }
  updateUser(id: number, changes: Partial<User>) { // cambio parte del usuario, opcional según la qeu se envíe
    return  this.http.put(`${environment.firebase.databaseURL}/users/${id}`, changes);
  }
  deleteUser(id: number) {
    return this.http.delete(`${environment.firebase.databaseURL}/users/${id}`);
  }

  // createUser(name: string, lastName: string, educationLevel: string, age: number, email: string) {
  //   return this.af.
  //   (name, lastName, educationLevel, age, email);
  // }

  // login(email: string, password: string) {
  //   return this.af.signInWithEmailAndPassword(email, password);
  // }

}
