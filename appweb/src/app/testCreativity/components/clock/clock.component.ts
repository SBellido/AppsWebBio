import {
    Component,
    OnChanges,
    SimpleChanges,
    OnInit,
    DoCheck,
    OnDestroy
} from '@angular/core';

import { Clock } from '../../../core/models/clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})

export class ClockComponent implements OnInit, OnDestroy {

    constructor() {
        console.log('constructor');
    }

    clock: Clock = {
        seconds: 0,
        minutes: 0
    };
    // ngOnChanges(changes: SimpleChanges) {
    //     console.log('ngOnChanges');
    //     console.log(changes);
    // }

    ngOnInit() {
        console.log('ngOnInit');
    }

    // ngDoCheck() {
    //     console.log('ngDoCheck');
    // }

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }
}



