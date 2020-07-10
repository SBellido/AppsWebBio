import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: string[] = [
    'assets/images/instruction_c1.png',
    'assets/images/instruction_c2.png',
    'assets/images/instruction_c3.png',
    'assets/images/instruction_c4.png',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
