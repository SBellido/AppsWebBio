import { Component, OnInit } from '@angular/core';
import { InstructionsCreativity } from '../../core/models/instructionsCreativity.module';

@Component({
  selector: 'app-instructions-creativity',
  templateUrl: './instructionsCreativity.component.html',
  styleUrls: ['./instructionsCreativity.component.scss']
})
export class InstructionsCreativityComponent implements OnInit {

  constructor() { }

  instructionsCrativity: InstructionsCreativity = {
    title: 'Instrucciones',
    description: 'Test de Creatividad'
  };

  ngOnInit(): void {
  }

}
