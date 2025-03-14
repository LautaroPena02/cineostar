import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OmdbService } from '../../../services/omdb.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  private popularTerms: string[] = [
    'star wars', 'avengers', 'godfather', 'harry potter', 
    'lord of the rings', 'jurassic park', 'batman'
  ];

  constructor(private omdbService: OmdbService) { }

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  loadPopularMovies(): void {
    const randomTerm = this.popularTerms[Math.floor(Math.random() * this.popularTerms.length)];
    
    this.isLoading = true;
    this.omdbService.searchMovies(randomTerm).subscribe({
      next: (data: any) => {
        if (data.Search && data.Search.length > 0) {
          this.popularMovies = data.Search.map((movie: any) => {
            return {
              id: movie.imdbID,
              title: movie.Title,
              poster_path: movie.Poster !== 'N/A' ? movie.Poster : '',
              release_date: movie.Year
            };
          });
          this.isLoading = false;
        } else {
          this.loadBackupMovies(); 
        }
      },
      error: (error: any) => {
        console.error('Error al cargar películas populares:', error);
        this.errorMessage = 'Error al cargar películas populares. Intenta recargar la página.';
        this.isLoading = false;
      }
    });
  }

  loadBackupMovies(): void {
    this.omdbService.searchMovies('movie').subscribe({
      next: (data: any) => {
        if (data.Search && data.Search.length > 0) {
          this.popularMovies = data.Search.map((movie: any) => {
            return {
              id: movie.imdbID,
              title: movie.Title,
              poster_path: movie.Poster !== 'N/A' ? movie.Poster : '',
              release_date: movie.Year
            };
          });
        } else {
          this.errorMessage = 'No se pudieron cargar películas.';
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Error al cargar películas. Intenta recargar la página.';
        this.isLoading = false;
      }
    });
  }
}