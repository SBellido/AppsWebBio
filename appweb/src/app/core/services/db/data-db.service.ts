import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CreativeUserI } from './../../models/creative-user.interface';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private creativesCollection: AngularFirestoreCollection<CreativeUserI>;

  constructor(private afs: AngularFirestore) {
    this.creativesCollection = afs.collection<any>('creatives-users');
  }

  saveContact(newContact: any): void {
    this.creativesCollection.add(newContact);
  }

}
