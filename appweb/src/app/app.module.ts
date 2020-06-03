import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user.components';
import { ProposalComponent } from './components/proposal.component';
import { ElementComponent } from './components/element.component';
import { TestComponent } from './components/test.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProposalComponent,
    ElementComponent,
    TestComponent
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
