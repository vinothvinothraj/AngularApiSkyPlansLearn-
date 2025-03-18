import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AirportsComponent } from './pages/airports/airports.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'airports', component: AirportsComponent }
];
