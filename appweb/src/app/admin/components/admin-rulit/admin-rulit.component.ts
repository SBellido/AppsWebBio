import { Component } from '@angular/core';
import { Parser, transforms } from 'json2csv';
import { DataDbService } from 'src/app/core/services/db/data-db.service';



@Component({
  selector: 'app-admin-rulit',
  templateUrl: './admin-rulit.component.html',
  styleUrls: ['../admin.component.scss'],
})
export class AdminRulitComponent{

  constructor( private dbData: DataDbService ) {}
  
  async getData() {
    let rulitUsers = await this.dbData.getAllRulitUsersData();
    rulitUsers.map( (user) => {user.timestamp = user.timestamp.toDate().toLocaleString() });
    console.log(rulitUsers);
    // CSV
    const flatOptions = transforms.flatten({ objects: true, arrays: true, separator: "_" });
    const json2csvParser = new Parser({ transforms: [ flatOptions ] });
    const csv = json2csvParser.parse(rulitUsers);
    // console.log(csv);
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  
}
