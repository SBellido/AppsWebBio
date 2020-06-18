import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFireDatabase } from '@angular/fire/database'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user/user.components';
import { ProposalComponent } from './components/proposal/proposal.component';
import { ElementComponent } from './components/element/element.component';
import { TestCreativityComponent } from './components/testCreativity/testCreativity.component';
import { ClockComponent } from './components/clock/clock.component';
import { HomeComponent } from './components/home/home.component';
import { InstructionsCreativityComponent } from './components/instructionsCreativity/instructionsCreativity.component';
import { HeaderComponent } from './components/header/header.component';

// import { environment } from './../environments/environment';

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
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuth,
    // AngularFireStorage,
    // HttpClientModule,
    // AngularFireDatabase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
