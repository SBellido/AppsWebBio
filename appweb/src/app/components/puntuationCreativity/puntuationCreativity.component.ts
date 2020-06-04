import { Component, OnInit } from '@angular/core';

import { PuntuationCreativity } from '../../puntuationCreativity.module';

@Component({
  selector: 'app-puntuation-creativity',
  templateUrl: './puntuationCreativity.component.html',
  styleUrls: ['./puntuationCreativity.component.scss']
})
export class PuntuationCreativityComponent implements OnInit {
  constructor() { }

  puntuationCreativity: PuntuationCreativity = {
    title: 'Puntuación',
    editorialDownload: 'Para puntuar tu participación se tendrán en cuenta los siguientes items',
    subtitle1: 'Originalidad',
    description1: 'Descripción de originalidad',
    subtitle2: 'Flexibilidad',
    description2: 'Descripción de flexibilidad',
    subtitle3: 'Fluidez',
    description3: 'Descripción de fluidez',
    subtitle4: 'Elavoración',
    description4: 'Descripción de elavoración'
  };

  ngOnInit(): void {
  }

}
