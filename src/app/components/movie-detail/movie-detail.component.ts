import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OmdbService } from '../../../services/omdb.service';
import { WatchlistService } from '../../../services/watchlist.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  showWatchlistMessage = false;
  showWatchedMessage = false;
  showWatchlistError = false; 
  showWatchedError = false;   

  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.omdbService.getMovieDetails(id).subscribe((data: any) => {
        this.movie = {
          id: data.imdbID,
          title: data.Title,
          poster_path: data.Poster !== 'N/A' ? data.Poster : '',
          overview: data.Plot,
          release_date: data.Released,
          vote_average: data.imdbRating
        };
      });
    }
  }

  addToWatchlist(): void {
    if (this.watchlistService.isInWatchlist(this.movie.id)) {
      this.showWatchlistError = true; 
      setTimeout(() => {
        this.showWatchlistError = false; 
      }, 3000);
    } else {
      this.watchlistService.addToWatchlist(this.movie);
      this.showWatchlistMessage = true; 
      setTimeout(() => {
        this.showWatchlistMessage = false; 
      }, 3000);
    }
  }

  addToWatched(): void {
    if (this.watchlistService.isInWatched(this.movie.id)) {
      this.showWatchedError = true; 
      setTimeout(() => {
        this.showWatchedError = false; 
      }, 3000);
    } else {
      this.watchlistService.addToWatched(this.movie);
      this.showWatchedMessage = true; 
      setTimeout(() => {
        this.showWatchedMessage = false; 
      }, 3000);
    }
  }
}