import { Component, OnInit } from '@angular/core';

import { CreativeUser } from './../../core/models/creative-user.interface';
import { DataDbService } from '../../core/services/db/data-db.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // users: User[] = [];
  users = [];
  displayedColumns: string[] = ['name', 'lastName', 'age', 'points'];

  constructor(
    private dataDbService: DataDbService // inyecta dependencia
  ) { }

  ngOnInit() {
    // this.fetchUsers();
  }

  // fetchUsers() {
  //   this.dataDbService.saveContact(); // devuelve un observable de tipo object

  // }

  // deleteUser(id: number) {
  //   this.usersService.deleteUser(3)
  //   .subscribe((user: any) => {
  //     console.log(user);
  //   });
  // }


}
