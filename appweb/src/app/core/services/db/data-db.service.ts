import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, DocumentChangeAction, DocumentData, DocumentReference, QuerySnapshot } from '@angular/fire/firestore';

import { CreativeUser } from './../../models/creative-user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AdminComponent } from 'src/app/admin/components/admin.component';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import { IRulitUser } from 'src/app/rulit/bits/RulitUserService';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  
  private creativesCollectionRef: AngularFirestoreCollection<CreativeUser>;
  private creativesMetadataRef: AngularFirestoreCollection;
  private rulitUserCollectionRef: AngularFirestoreCollection;
  public creativesUsers = [];

  constructor(private afs: AngularFirestore, private http: HttpClient) { 
    this.creativesCollectionRef = afs.collection<CreativeUser>('creatives-users', ref => ref.orderBy('dateStart', 'desc'));
    this.creativesMetadataRef = afs.collection('creatives-meta');
    this.rulitUserCollectionRef = afs.collection('rulit-users');
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

  public getTestsFirstPage(pageSize: number = 3):  Observable<QuerySnapshot<CreativeUser>> {
    const testsRef = this.afs.collection<CreativeUser>('creatives-users', 
      ref => ref.orderBy('dateStart', 'desc').limit(pageSize));
    
    return testsRef.get();
  }

  public getTestsNextPage(actualLast, pageSize: number = 3):  Observable<QuerySnapshot<CreativeUser>> {
    const testsRef = this.afs.collection<CreativeUser>('creatives-users', 
      ref => ref.orderBy('dateStart', 'desc').startAfter(actualLast).limit(pageSize));
    
    return testsRef.get();
  }
  
  public getTestsPrevPage(prevFirst,actualFirst, pageSize: number = 3):  Observable<QuerySnapshot<CreativeUser>> {
    const testsRef = this.afs.collection<CreativeUser>('creatives-users', 
      ref => ref.orderBy('dateStart', 'desc').startAt(prevFirst).endBefore(actualFirst).limit(pageSize));
    
    return testsRef.get();
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


  async saveRulitUserData(testUser: IRulitUser): Promise<string> {
    let newUserDocument = await this.rulitUserCollectionRef.add(testUser);
    return newUserDocument.id;
  }

  async getRulitUserData(userId: string): Promise<IRulitUser> {
    let userData = await this.rulitUserCollectionRef.doc<IRulitUser>(userId).get().toPromise();
    userData.data().userId = userId;
    return userData.data();
  }
  
  async updateRulitUserData(testUser: IRulitUser): Promise<void> {
    await this.rulitUserCollectionRef.doc(testUser.userId).set(testUser);
  }


}

