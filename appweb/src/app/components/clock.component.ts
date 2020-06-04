import {
    Component,
    OnChanges,
    SimpleChanges,
    OnInit,
    DoCheck
} from '@angular/core';

import { Clock } from '../clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-clock',
    templateUrl: './clock.component.html'
})

export class ClockComponent implements OnInit, DoCheck {
    clock: Clock = {
        seconds: 0,
        minutes: 0
    };

    constructor() {
        console.log('constructor');
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log('ngOnChanges');
    //     console.log(changes);
    // }

    ngOnInit() {
        console.log('ngOnInit');
    }

    ngDoCheck() {
        console.log('ngDoCheck');
    }

}



