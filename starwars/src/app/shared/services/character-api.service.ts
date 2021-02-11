import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // get the character info
  public getCharacter(id): Observable<any> {
    const url = `${this.baseUrl}/api/characters/${id}`;
    return this.http.get(url);
  }

  // get the names and ids of characters of a film
  public getCast(id): Observable<any> {
    const url = `${this.baseUrl}/api/films/${id}`;
    console.log(url);
    return this.http.get(url);
  }
}

