import { Component, OnInit } from '@angular/core';

import Swiper from 'swiper';

@Component({
    selector: 'app-rulit-instructions',
    templateUrl: './rulit-instructions.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitInstructionsComponent implements OnInit {

    mySwiper: Swiper;

    constructor() {}

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

