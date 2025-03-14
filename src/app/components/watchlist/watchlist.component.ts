import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  removeFromWatchlist(movieId: number | string): void {
    this.watchlistService.removeFromWatchlist(movieId);
    this.watchlist = this.watchlistService.getWatchlist();
  }
}