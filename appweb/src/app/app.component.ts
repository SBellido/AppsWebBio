import { Component } from '@angular/core';
// import { User } from './user.module';
import { Proposal } from './proposal.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'appweb';
  items = ['nicolas', 'julian', 'perez'];

  proposals: Proposal[] = [
    {
        id: 1,
        description: 'Hacer un avión de papel'
    },
    {
        id: 2,
        description: 'Envolver huevos'
    }
  ];

  // users: User[] = [
  //   {
  //     id: 1,
  //     image: 'assets/images/user1.jpg',
  //     name: 'Sebastián Bellido',
  //     age: 40,
  //     educationLevel: 'Academic',
  //     originality: 2,
  //     flexibility: 4,
  //     fluency: 3,
  //     elaboration: 9,
  //     ranking: 3,
  //     points: 25
  //   },
  //   {
  //     id: 2,
  //     image: 'assets/images/user2.jpg',
  //     name: 'Frabricio Ballarini',
  //     age: 38,
  //     educationLevel: 'Academic',
  //     originality: 2,
  //     flexibility: 4,
  //     fluency: 3,
  //     elaboration: 9,
  //     ranking: 2,
  //     points: 26
  //   },
  //   {
  //     id: 3,
  //     image: 'assets/images/user3.jpg',
  //     name: 'Mario Pergolini',
  //     age: 56,
  //     educationLevel: 'High School',
  //     originality: 4,
  //     flexibility: 4,
  //     fluency: 3,
  //     elaboration: 9,
  //     ranking: 1,
  //     points: 27
  //   },
  //   {
  //     id: 4,
  //     image: 'assets/images/user4.jpg',
  //     name: 'Cristian García Bauza',
  //     age: 50,
  //     educationLevel: 'Academic',
  //     originality: 2,
  //     flexibility: 4,
  //     fluency: 3,
  //     elaboration: 4,
  //     ranking: 4,
  //     points: 20
  //   }
  // ];

  /*agrega elemento al arreglo items*/
  addItem() {
    this.items.push('nuevo item');
  }

  /* indice de tipo number */
  deleteItem(index: number) {
    /*ejecuta la eliminación del indice e indica la cantidad de elementos a borrar*/
    this.items.splice(index, 1);
  }

  addProposal(description: string){
    console.log('Propuesta');
    console.log(description);

  }

}

