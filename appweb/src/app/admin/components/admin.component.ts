import { Component, OnInit, ViewChild } from '@angular/core';
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
import { CreativeUser } from '../../core/models/creative-user.interface';

import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public creativesUsers: CreativeUser[] = [];
  public count = 1;
  public end = false;
  public totalTestsCounter: any = { count: -1 };
  // public admin: AdminComponent

  // Columnas de la tabla que se van a mostrar
  displayedColumns: string[] = ["nameLastName", "age", "city", "educationLevel", "educationStatus", "school", "degree",
                                  "year", "grade", "course" , "object", "proposal", "dateStart", "dateEnd" ];
  
  // Referencia a la tabla de usuarios
  @ViewChild(MatTable) table: MatTable<CreativeUser>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dbData: DataDbService,
    private FileSaverService: FileSaverService,
    private afStorage: AngularFirestore
  ) { }


  //al iniciar esta sección, se obtienen todos los datos de la colección 'creativesUsers'
  ngOnInit(): void {
    this.dbData.getAllUser().subscribe((usersSnapshop) => {
      usersSnapshop.forEach((usersData: any) => {
        this.creativesUsers.push(usersData.payload.doc.data());
      });
      // Refresco la tabla despues de cargarle los usuarios
      this.table.renderRows();
    });

    // Get total number of creative tests users using creative-metadata collection
    this.dbData.getCreativesMetadataCounter().snapshotChanges().subscribe( counterData => {
      this.totalTestsCounter = counterData.payload.data();
    });

  }

  public getData() {
    let data = this.dbData.getCreativesUsersData(this);
    return data;
  }

  downloadFile(data: any) {
    let csvData = this.ConvertToCSV(data, ['nameLastName','age', 'city', 'educationLevel', 'educationStatus', 
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
     
      
      objArray.forEach(data => {
        data.dateStart = data.dateStart.toDate();
        data.dateEnd = data.dateEnd.toDate();
      });
      
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
