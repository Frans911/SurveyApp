import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  Surveys = [];
  AgeList = [];
  TotalNumberSurveys = 0;
  AvarageAge = 0;
  AverageEatOutes = 0;
  AverageMovieWatchers = 0;
  AverageTvWatchers = 0;
  AverageRadioListeners = 0;
  OldestPerson = 0;
  YoungestPerson = 0;
  PizzaLoverPercentage = 0;
  PastaLoversPercentage = 0;
  PapWorsPercentages = 0;

  sumOfEatOuts = 0;
  sumOfMovieWatchers = 0;
  sumOfTvWatches = 0;
  sumOfRadioListeners = 0;
  sumOfages = 0;
  pizzaLovers = 0;
  pastaLovers = 0;
  papWorsLovers = 0; 
  constructor(private routes:Router,private database: AngularFirestore) {

   }

  ngOnInit() { 

    this.database.collection('Surveys').snapshotChanges().subscribe(data => {
      this.AgeList = [];
      this.sumOfEatOuts = 0;
      this.sumOfMovieWatchers = 0;
      this.sumOfTvWatches = 0;
      this.sumOfRadioListeners = 0;
      this.sumOfages = 0;
      this.pizzaLovers = 0;
      this.pastaLovers = 0;
      this.papWorsLovers = 0; 
      this.Surveys = data.map(e => {
        return{ 
          data:e.payload.doc.data()
        } 
      });  
      this.TotalNumberSurveys = this.Surveys.length;
      for(let survey of this.Surveys){
        this.sumOfages += parseInt(survey.data.PersonalInformation.age);
        this.sumOfEatOuts += parseInt(survey.data.EatOut);
        this.sumOfMovieWatchers += parseInt(survey.data.WatchMovies);
        this.sumOfTvWatches += parseInt(survey.data.WatchTV);
        this.sumOfRadioListeners += parseInt(survey.data.ListenRadio);
        this.AgeList.push(parseInt(survey.data.PersonalInformation.age));
        if(survey.data.FavouriteFood.pizza == true){
          this.pizzaLovers += 1;
        }
        if(survey.data.FavouriteFood.pasta == true){
          this.pastaLovers += 1;
        }
        if(survey.data.FavouriteFood.papWors == true){
          this.papWorsLovers += 1;
        }
      }
      this.AvarageAge = this.sumOfages / this.Surveys.length;
      this.AverageEatOutes = this.sumOfEatOuts / this.Surveys.length;
      this.AverageMovieWatchers = this.sumOfMovieWatchers / this.Surveys.length;
      this.AverageTvWatchers = this.sumOfTvWatches / this.Surveys.length;
      this.AverageRadioListeners = this.sumOfRadioListeners / this.Surveys.length;
      this.OldestPerson = Math.max(...this.AgeList);
      this.YoungestPerson = Math.min(...this.AgeList);
      this.PizzaLoverPercentage = (this.pizzaLovers/this.Surveys.length)*100;
      this.PastaLoversPercentage = (this.pastaLovers/this.Surveys.length)*100;
      this.PapWorsPercentages = (this.pastaLovers/this.Surveys.length)*100;
      console.log(this.AverageEatOutes);
    })
    
  }
  Confirm(){
    this.routes.navigateByUrl('Landing');
  }

}
