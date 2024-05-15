import { Routes } from '@angular/router';
import { EvernotelistListComponent } from './evernotelist-list/evernotelist-list.component';
import { EvernotelistDetailComponent } from './evernotelist-detail/evernotelist-detail.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'notelist', component: EvernotelistListComponent },
    { path: 'notelist/:id', component: EvernotelistDetailComponent }
];
