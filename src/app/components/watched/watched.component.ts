import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../../services/watchlist.service';

@Component({
  selector: 'app-watched',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {
  watched: any[] = [];

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.watched = this.watchlistService.getWatched();
  }

  removeFromWatchlist(movieId: number | string): void {
    this.watchlistService.removeFromWatched(movieId); 
    this.watched = this.watchlistService.getWatched(); 
  }
}