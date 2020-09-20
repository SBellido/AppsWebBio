import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MoreInfoRoutingModule } from './more-info-routing.module';
import { MoreInfoComponent } from './components/more-info.component';


@NgModule({
  declarations: [MoreInfoComponent],
  imports: [
    CommonModule,
    MoreInfoRoutingModule,
    SharedModule
  ]
})
export class MoreInfoModule { }
