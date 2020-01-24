import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';

import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
