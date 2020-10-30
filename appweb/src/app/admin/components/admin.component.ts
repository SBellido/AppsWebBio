import { Component, OnInit } from '@angular/core';

import { DataDbService } from '../../core/services/db/data-db.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  public creativesUsers = [];
  public count = 1;  

  constructor(
    private router: Router, 
    private dbData: DataDbService,
  ) { }

// al ingresar a la sección admin se obtienen los datos cargados en la colección 'creativesUsers'
  ngOnInit(): void {  
    this.dbData.getAllUser().subscribe((usersSnapshop) => {
      this.creativesUsers = [];
      usersSnapshop.forEach((usersData: any) => {
        this.creativesUsers.push({
          id: usersData.payload.doc.id,
          date: usersData.payload.doc.dateStart,
          data: usersData.payload.doc.data()
        });
      });
    }); 
  }


}



