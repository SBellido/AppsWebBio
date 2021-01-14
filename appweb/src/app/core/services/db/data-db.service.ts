import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, DocumentData, QuerySnapshot } from '@angular/fire/firestore';

import { CreativeUser } from './../../models/creative-user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AdminComponent } from 'src/app/admin/components/admin.component';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private creativesCollectionRef: AngularFirestoreCollection<CreativeUser>;
  private creativesMetadataRef: AngularFirestoreCollection;
  public creativesUsers = [];

  constructor(private afs: AngularFirestore, private http: HttpClient) { 
    this.creativesCollectionRef = afs.collection<CreativeUser>('creatives-users', ref => ref.orderBy('dateStart', 'desc'));
    this.creativesMetadataRef = afs.collection('creatives-meta');
   } 

  async saveContact(newCreativeUser: any): Promise<void> {
    this.creativesCollectionRef.add(newCreativeUser);

    // get actual counter
    let prevCounter = await this.getCreativesMetadataCounter().ref.get();
    // increment counter
    let newCounter = prevCounter.data().count + 1;
    // update tests counter
    this.getCreativesMetadataCounter().update({ "count": newCounter });

  }

  public getAllUser() {
    // this.creativesCollectionRef = this.afs.collection<CreativeUser>('creatives-users', ref => ref.orderBy('dateStart', 'desc'));
    return this.creativesCollectionRef.snapshotChanges();   
  }

  public getCreativesUsersData(admin: AdminComponent) {
  // Asigna la instantánea para incluir el ID del documento
  this.creativesCollectionRef.snapshotChanges().subscribe((usersSnapshop) => {
    usersSnapshop.forEach((usersData: any) => {
      this.creativesUsers.push(
        usersData.payload.doc.data()       
      );
      });
    admin.downloadFile(this.creativesUsers);
    });
  }

  public getCreativesMetadataCounter(){
    return this.creativesMetadataRef.doc('tests-counter');
  }


}

