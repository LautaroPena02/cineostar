import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private apiKey = 'd8aef4a3'
  private baseUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) { }

  // Buscar películas por término
  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${query}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener detalles de una película por ID
  getMovieDetails(id: string): Observable<any> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}