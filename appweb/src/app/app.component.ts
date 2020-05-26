import { Component } from '@angular/core';
import { User } from './user.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appweb';
  items = ['nicolas', 'julian', 'perez'];

  users: User[] = [
    {
      id: 1,
      image: 'assets/images/user1.jpg',
      name: 'Sebastián Bellido',
      age: 40,
      educationLevel: 'Academic'
    },
    {
      id: 2,
      image: 'assets/images/user2.jpg',
      name: 'Frabricio Ballarini',
      age: 38,
      educationLevel: 'Academic'
    },
    {
      id: 3,
      image: 'assets/images/user3.jpg',
      name: 'Mario Pergolini',
      age: 56,
      educationLevel: 'High School'
    },
    {
      id: 4,
      image: 'assets/images/user4.jpg',
      name: 'Cristian García Bauza',
      age: 50,
      educationLevel: 'Academic'
    }
  ];

   /*agrega elemento al arreglo items*/
   addItem() {
    this.items.push('nuevo item');
  }

/* indice de tipo number */
deleteItem(index: number) {
    /*ejecuta la eliminación del indice e indica la cantidad de elementos a borrar*/
    this.items.splice(index, 1);
  }

}
