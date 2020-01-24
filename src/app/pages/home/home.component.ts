import { Component, OnInit } from '@angular/core';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

export interface SurveyInfo { 
  habit: string;
  strongAgree: string;
  agree: string;
  neutral: string;
  disagree:string;
  strongDisagree:string;
} 
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit { 
  buttonOne = 0;
  buttonTwo = 0;
  buttonThree = 0;
  buttonFour = 0;
  food = [];
  pizza;
  

  ELEMENT_DATA: SurveyInfo[] = [
    {habit: 'I like to eat out', strongAgree: 'e1', agree: 'e2', neutral: 'e3', disagree: 'e4', strongDisagree: 'e5'},
    {habit: 'I like to watch movies', strongAgree: 'm1', agree: 'm2', neutral: 'm3', disagree: 'm4', strongDisagree: 'm5'},
    {habit: 'I like to watch TV', strongAgree: 't1', agree: 't2', neutral: 't3', disagree: 't4', strongDisagree: 't5'},
    {habit: 'I like to listen to the radio', strongAgree: 'r1', agree: 'r2', neutral: 'r3', disagree: 'r4', strongDisagree: 'r5'}
  ];
  
    displayedColumns: string[] = ['habit', 'strongAgree', 'agree', 'neutral','disagree','strongDisagree'];
  dataSource = this.ELEMENT_DATA;
  public PersonalInformation: FormGroup;
  public FavouriteFood: FormGroup;
  constructor(private formBuilder: FormBuilder,private routes:Router,private database: AngularFirestore,private snackBar: MatSnackBar) { 
    this.PersonalInformation = formBuilder.group({
      lastname: ['', Validators.compose([Validators.required])],
      fullname: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]+$')])],
      date: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9]+$'),Validators.max(120), Validators.min(5)])],
    });

    this.FavouriteFood = formBuilder.group({
      pizza: ['', Validators.compose([Validators.required])],
      pasta: ['', Validators.compose([Validators.required])],
      papWors: ['', Validators.compose([Validators.required])],
      chicken: ['', Validators.compose([Validators.required])],
      beef: ['', Validators.compose([Validators.required])],
      other: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit() { 
  } 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  show(value){
    if(value.substring(0,1) == 'e'){
      this.buttonOne = parseInt(value.substring(1,2));
    }else if(value.substring(0,1) == 'm'){
      this.buttonTwo= parseInt(value.substring(1,2));
    }else if(value.substring(0,1) == 't'){
      this.buttonThree = parseInt(value.substring(1,2));
    }else if(value.substring(0,1) == 'r'){
      this.buttonFour = parseInt(value.substring(1,2));
    }
    // console.log('button 1 :'+this.buttonOne+
    // '\nbutton 2 :'+this.buttonTwo+
    // '\nbutton 3 :'+this.buttonThree+
    // '\nbutton 4 :'+this.buttonFour);
  }
  Upload(){

    if((this.PersonalInformation.value.lastname == "" || this.PersonalInformation.value.fullname == "" || this.PersonalInformation.value.number == ""
    || this.PersonalInformation.value.date == "" || this.PersonalInformation.value.age == "") || (this.FavouriteFood.value.pizza == "" && 
    this.FavouriteFood.value.chicken == "" && this.FavouriteFood.value.pasta == "" && this.FavouriteFood.value.papWors == "" && this.FavouriteFood.value.beef == ""
    && this.FavouriteFood.value.other == "") || (this.buttonOne == 0 || this.buttonTwo == 0 || this.buttonThree == 0 || this.buttonFour == 0)){
      this.openSnackBar('Fill the required fields','OK') 
    }else{
    this.database.collection('Surveys').add({
      PersonalInformation:this.PersonalInformation.value,
      FavouriteFood:this.FavouriteFood.value,
      EatOut:this.buttonOne,
      WatchMovies:this.buttonTwo,
      WatchTV:this.buttonThree,
      ListenRadio:this.buttonFour

    });
    this.routes.navigateByUrl('Landing');
    }  
  }
  

}
