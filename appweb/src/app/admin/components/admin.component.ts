import { Component, OnInit } from '@angular/core';

import { DataDbService } from '../../core/services/db/data-db.service';

import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private dbData: DataDbService) { }

  ngOnInit(): void {
    this.dbData.getAllUser();
  }

}

