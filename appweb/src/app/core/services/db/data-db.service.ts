import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CreativeUser } from './../../models/creative-user.interface';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private creativesCollection: AngularFirestoreCollection<CreativeUser>;

  constructor(private afs: AngularFirestore) {
    this.creativesCollection = afs.collection<any>('creatives-users');
  }

  saveContact(newCreativeUser: any): void {
    this.creativesCollection.add(newCreativeUser);
  }
  public getAllUser() {
    console.log(this.afs.collection('creatives-users').snapshotChanges());   
    return this.afs.collection('creatives-users').snapshotChanges();
  }
  // getAllUser(): Observable<QuerySnapshot<DocumentData>> {
  //   // tslint:disable-next-line: prefer-const
  //   let collection: Observable<QuerySnapshot<DocumentData>>;
  //   collection = this.creativesCollection.get();
  //   return collection;
  // }
  
  // getAllUser():  Observable<QuerySnapshot<DocumentData>> {
  //   // tslint:disable-next-line: prefer-const
  //   let collection:  Observable<QuerySnapshot<DocumentData>>;
  //   collection = this.creativesCollection.get();
  //   console.log(collection);
    
  //   return collection;
  // }
}
