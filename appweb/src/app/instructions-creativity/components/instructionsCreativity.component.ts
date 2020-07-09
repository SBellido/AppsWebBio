import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InstructionsCreativity } from '../../core/models/instructionsCreativity.module';
import Swiper from 'swiper';

@Component({
  selector: 'app-instructions-creativity',
  templateUrl: './instructionsCreativity.component.html',
  styleUrls: ['./instructionsCreativity.component.scss']
})
export class InstructionsCreativityComponent implements OnInit, AfterViewInit {

  mySwiper: Swiper;

  constructor() { }

  instructionsCrativity: InstructionsCreativity = {
    title: 'Instrucciones',
    description: 'Test de Creatividad'
  };

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
