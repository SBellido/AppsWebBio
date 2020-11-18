import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, DocumentData, QuerySnapshot } from '@angular/fire/firestore';

import { CreativeUser } from './../../models/creative-user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private creativesCollection: AngularFirestoreCollection<CreativeUser>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {  
    this.creativesCollection = afs.collection<any>('creatives-users');
  } 
  

  saveContact(newCreativeUser: any): void {
    this.creativesCollection.add(newCreativeUser);
  }

  public getAllUser() {
    console.log(this.afs.collection('creatives-users').snapshotChanges());   
    return this.afs.collection('creatives-users').snapshotChanges();
  }

  public getData() {
  // Asigna la instantánea para incluir el ID del documento
  this.creativesCollection.snapshotChanges().subscribe((usersSnapshop) => { 
    return usersSnapshop.map(user => { 
      const data = user.payload.doc.data()
      const id = user.payload.doc.id

      this.downloadFile(data);
      // this.downloadFile(data, 'json')
      
      // return { data, id }
      return data;
    })
  })
}  


downloadFile(data : any) {
  const json = JSON.stringify(data);
  console.log(json);
  
//   let csvData = this.ConvertToCSV(json, ['nameLastName','age', 'city', 'aducationLevel', 'educationStatus', 
// 'school', 'degree', 'year', 'grade', 'course', 'object', 'proposal', 'dateStart', 'dateEnd']);

let csvData = this.ConvertToCSV(json, data);

 
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let dwldLink = document.createElement("a");
  let url = URL.createObjectURL(blob);
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
  }

  dwldLink.setAttribute("href", url);
  dwldLink.setAttribute("download", "filename" + ".csv");
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
  console.log(csvData);
}

ConvertToCSV(objArray : any, headerList : any) {
   let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   let str = '';
   let row = 'S.No,';

    for (let index in headerList) {
       row += headerList[index] + ',';
   }

   row = row.slice(0, -1);
   str += row + '\r\n';

   for (let i = 0; i < array.length; i++) {
       let line = (i+1)+'';
       for (let index in headerList) {
          let head = headerList[index];
           line += ',' + array[i][head];
       }    
       str += line + '\r\n';
   }
   return str;
}
}

