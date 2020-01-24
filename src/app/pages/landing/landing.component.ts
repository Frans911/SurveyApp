import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private routes:Router) { }

  ngOnInit() {

  }
  OpenSurvey(){
    console.log('Open survey');
    this.routes.navigateByUrl('Home');
  }
  SurveyResults(){
    this.routes.navigateByUrl('Results');
  }
  

}
