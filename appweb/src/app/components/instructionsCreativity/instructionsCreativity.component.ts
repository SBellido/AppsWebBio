import { Component, OnInit } from '@angular/core';
import { InstructionCreativity } from '../../instruccionCreativity.module';
@Component({
  selector: 'app-instructions-creativity',
  templateUrl: './instructionsCreativity.component.html',
  styleUrls: ['./instructionsCreativity.component.scss']
})
export class InstructionsCreativityComponent implements OnInit {

  constructor() { }

  instructionsCrativity: InstructionCreativity = {
    title: 'Instrucciones',
    description: 'Test de Creatividad'
  };

  ngOnInit(): void {
  }

}
