import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OmdbService } from '../../../services/omdb.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  searchResults: any[] = [];
  errorMessage: string = '';
  recentSearches: string[] = [];

  constructor(private omdbService: OmdbService) {
    this.loadRecentSearches();
  }

  searchMovies(): void {
    if (this.query) {
      this.omdbService.searchMovies(this.query).subscribe({
        next: (data: any) => {
          if (data.Search && data.Search.length > 0) {
            this.searchResults = data.Search.map((movie: any) => {
              return {
                id: movie.imdbID,
                title: movie.Title,
                poster_path: movie.Poster !== 'N/A' ? movie.Poster : '',
                release_date: movie.Year
              };
            });
            this.saveRecentSearch(this.query);
          } else {
            this.searchResults = [];
            this.errorMessage = 'No se encontraron resultados';
          }
        },
        error: (error: any) => {
          this.errorMessage = 'Error al buscar películas. Por favor, inténtalo de nuevo.';
          console.error(error);
        }
      });
    }
  }

  saveRecentSearch(query: string): void {
    this.recentSearches = this.recentSearches.filter(search => search !== query);
    this.recentSearches.unshift(query);
    if (this.recentSearches.length > 5) {
      this.recentSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  loadRecentSearches(): void {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      this.recentSearches = JSON.parse(searches);
    }
  }

  clearRecentSearches(): void {
    this.recentSearches = [];
    localStorage.removeItem('recentSearches');
  }
}