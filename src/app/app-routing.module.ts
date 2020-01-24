import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "Landing",
    pathMatch: "full"
  }, 
  { path: 'Landing', component: LandingComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Results', component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
