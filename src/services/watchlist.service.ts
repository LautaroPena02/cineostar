import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: any[] = [];
  private watched: any[] = [];

  constructor() {}

  isInWatchlist(movieId: string | number): boolean {
    return this.watchlist.some(m => m.id === movieId);
  }

  isInWatched(movieId: string | number): boolean {
    return this.watched.some(m => m.id === movieId);
  }

  addToWatchlist(movie: any): void {
    if (!this.isInWatchlist(movie.id)) {
      this.watchlist.push(movie);
    }
  }

  addToWatched(movie: any): void {
    if (!this.isInWatched(movie.id)) {
      this.watched.push(movie);
    }
  }

  getWatchlist(): any[] {
    return this.watchlist;
  }

  getWatched(): any[] {
    return this.watched;
  }

  removeFromWatchlist(movieId: number | string): void {
    this.watchlist = this.watchlist.filter(m => m.id !== movieId);
  }

  removeFromWatched(movieId: number | string): void {
    this.watched = this.watched.filter(m => m.id !== movieId);
  }
}