import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-test',
  templateUrl: './select-test.component.html',
  styleUrls: ['./select-test.component.scss']
})
export class SelectTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // localStorage.clear();
    localStorage.removeItem('creative-user');

  }

}
