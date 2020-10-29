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

  getAllUser(): Observable<QuerySnapshot<DocumentData>> {
    // tslint:disable-next-line: prefer-const
    let collection: Observable<QuerySnapshot<DocumentData>>;
    collection = this.creativesCollection.get();
    console.log(collection);
    return collection;
  }



}
