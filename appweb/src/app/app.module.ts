import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user/user.components';
import { ProposalComponent } from './components/proposal/proposal.component';
import { ElementComponent } from './components/element/element.component';
import { TestCreativityComponent } from './components/testCreativity/testCreativity.component';
import { ClockComponent } from './components/clock/clock.component';
import { HomeComponent } from './components/home/home.component';
import { InstructionsCreativityComponent } from './components/instructionsCreativity/instructionsCreativity.component';
import { PuntuationCreativityComponent } from './components/puntuationCreativity/puntuationCreativity.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProposalComponent,
    ElementComponent,
    TestCreativityComponent,
    ClockComponent,
    HomeComponent,
    InstructionsCreativityComponent,
    PuntuationCreativityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
