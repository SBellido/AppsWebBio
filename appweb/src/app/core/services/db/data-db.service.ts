import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, DocumentChangeAction, DocumentData, QuerySnapshot } from '@angular/fire/firestore';

import { CreativeUser } from './../../models/creative-user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AdminComponent } from 'src/app/admin/components/admin.component';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private creativesCollectionRef: AngularFirestoreCollection<CreativeUser>;
  private creativesMetadataRef: AngularFirestoreCollection;
  public creativesUsers = [];

  constructor(private afs: AngularFirestore, private http: HttpClient) { 
    this.creativesCollectionRef = afs.collection<CreativeUser>('creatives-users');
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

  public getTestsFirstPage(pageSize: number = 3):  Observable<DocumentChangeAction<CreativeUser>[]> {
    const testsRef = this.afs.collection<CreativeUser>('creatives-users', 
      ref => ref.orderBy('dateStart', 'desc').limit(pageSize));
    
    return testsRef.snapshotChanges();
  }

  public getTestsNextPage(lastUser, pageSize: number = 3):  Observable<DocumentChangeAction<CreativeUser>[]> {
    const testsRef = this.afs.collection<CreativeUser>('creatives-users', 
      ref => ref.orderBy('dateStart', 'desc').startAfter(lastUser).limit(pageSize));
    
    return testsRef.snapshotChanges();
  }
  
  public getTestsPrevPage(firstUser, pageSize: number = 3):  Observable<DocumentChangeAction<CreativeUser>[]> {
    const testsRef = this.afs.collection<CreativeUser>('creatives-users', 
      ref => ref.orderBy('dateStart', 'desc').endBefore(firstUser).limit(pageSize));
    
    return testsRef.snapshotChanges();
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

