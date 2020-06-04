import {
    Component,
    OnChanges,
    SimpleChanges,
    OnInit,
    DoCheck,
    OnDestroy
} from '@angular/core';

import { Clock } from '../clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})

export class ClockComponent implements OnInit, DoCheck, OnDestroy {
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

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }
}



