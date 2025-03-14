import { Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { MovieDetailComponent } from '../app/components/movie-detail/movie-detail.component';
import { SearchComponent } from '../app/components/search/search.component';
import { WatchlistComponent } from '../app/components/watchlist/watchlist.component';
import { WatchedComponent } from '../app/components/watched/watched.component';

export const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'watched', component: WatchedComponent },
  { path: '**', redirectTo: '' }
];