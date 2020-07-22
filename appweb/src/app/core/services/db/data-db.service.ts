import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
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

}
