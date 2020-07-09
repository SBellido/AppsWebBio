import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images: string[] = [
    'assets/images/testCreatividad.png',
    'assets/images/testInhibicion.png',
    'assets/images/testMemoria.png',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
