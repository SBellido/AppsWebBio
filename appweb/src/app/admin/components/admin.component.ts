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
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private dbData: DataDbService,
    private FileSaverService: FileSaverService,
    private afStorage: AngularFirestore,
    
  ) { }



  // al iniciar esta sección, se obtienen 
  //todos los datos de la colección 'creativesUsers'
  ngOnInit(): void {
    this.dbData.getAllUser().subscribe((usersSnapshop) => {
      usersSnapshop.forEach((usersData: any) => {
        this.creativesUsers.push({
          id: usersData.payload.doc.id,
          // date: usersData.payload.doc.dateStart,
          data: usersData.payload.doc.data()         
        });
      });
    });
  }

  public getData() {
    let data = this.dbData.getData();
    return data;
  }

  
 

  

}
