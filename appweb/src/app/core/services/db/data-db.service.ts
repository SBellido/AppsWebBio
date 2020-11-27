import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, DocumentData, QuerySnapshot } from '@angular/fire/firestore';

import { CreativeUser } from './../../models/creative-user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AdminComponent } from 'src/app/admin/components/admin.component';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private creativesCollection: AngularFirestoreCollection<CreativeUser>;
  public creativesUsers = [];

  constructor(private afs: AngularFirestore, private http: HttpClient) {  
    this.creativesCollection = afs.collection<any>('creatives-users');
  } 
  

  saveContact(newCreativeUser: any): void {
    this.creativesCollection.add(newCreativeUser);
  }

  public getAllUser() {
    return this.afs.collection('creatives-users').snapshotChanges();
  }

  public getCreativesUsersData(admin: AdminComponent) {
  // Asigna la instantánea para incluir el ID del documento
  this.afs.collection('creatives-users').snapshotChanges().subscribe((usersSnapshop) => {
    usersSnapshop.forEach((usersData: any) => {
      this.creativesUsers.push(
        usersData.payload.doc.data()       
      );
    });
    admin.downloadFile(this.creativesUsers);
  });
}  



}

