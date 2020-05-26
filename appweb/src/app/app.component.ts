import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appweb';
  items = ['nicolas', 'julian', 'perez'];

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
