import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactI } from './../../models/contact.interface';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private contactCollection: AngularFirestoreCollection<ContactI>;

  constructor(private afs: AngularFirestore) {
    this.contactCollection = afs.collection<any>('contacts');
  }

  saveContact(newContact: any): void {
    this.contactCollection.add(newContact);
  }

}
