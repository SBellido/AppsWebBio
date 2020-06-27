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

import { HomeComponent } from './components/home/home.component';
import { InstructionsCreativityComponent } from './components/instructionsCreativity/instructionsCreativity.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SelectTestComponent } from './components/select-test/select-test.component';

// import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstructionsCreativityComponent,
    HeaderComponent,
    LayoutComponent,
    PageNotFoundComponent,
    SelectTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
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
