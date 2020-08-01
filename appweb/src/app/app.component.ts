import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Element } from './core/models/element.module';

@Component({
  selector: 'app-root',
  // se usa cuando el template es muy corto
  template: '<router-outlet></router-outlet>',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  element: Element;

  elementClip: Element = {
    // variable codigo
    id: 1,
    name: 'Clip',
    image: 'assets/images/clip.jpg',
    code: '1a2b3c'
};

elementJournal: Element = {
    // variable codigo
    id: 2,
    name: 'Diario',
    image: 'assets/images/diario.jpg',
    code: '4d5e6f'
};
  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    // ngOnInit() {
    //   this.data = this.route.paramMap.pipe(
    //     switchMap(params => {
    //       const id = +params.get("id")
    //       return this.service.getData(id) // http request
    //     })
    //   )
    // }
    this.route.paramMap.subscribe(params => {
      this.elementClip.code = params.get('element');
    });
    console.log(this.elementClip.code);
  }

}
