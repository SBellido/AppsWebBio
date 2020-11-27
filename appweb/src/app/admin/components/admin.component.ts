import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { DataDbService } from '../../core/services/db/data-db.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreModule,
  DocumentData,
  QuerySnapshot,
} from '@angular/fire/firestore';

import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public creativesUsers = [];
  public count = 1;
  public end = false;
  // public admin: AdminComponent

  constructor(
    private http: HttpClient,
    private router: Router,
    private dbData: DataDbService,
    private FileSaverService: FileSaverService,
    private afStorage: AngularFirestore,

    
  ) { }


//al iniciar esta sección, se obtienen todos los datos de la colección 'creativesUsers'
  ngOnInit(): void {
    this.dbData.getAllUser().subscribe((usersSnapshop) => {
      usersSnapshop.forEach((usersData: any) => {
        this.creativesUsers.push({
          id: usersData.payload.doc.id,
          data: usersData.payload.doc.data()         
        });
      });
    });
  }

  public getData() {
    let data = this.dbData.getCreativesUsersData(this);
    return data;
  }

  downloadFile(data: any) {
    let csvData = this.ConvertToCSV(data, ['nameLastName','age', 'city', 'aducationLevel', 'educationStatus', 
    'school', 'degree', 'year', 'grade', 'course', 'object', 'proposal', 'dateStart', 'dateEnd']);
     
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
    
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", "dataUsersCreatives" + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
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
              //  console.log(array[i]);
               
           }    
           str += line + '\r\n';
       }
       return str;
    }
 

  

}