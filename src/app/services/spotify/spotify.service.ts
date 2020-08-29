import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from '../../share/auth';
import { Albums } from './albums';
import { Artists } from './artists';
import { Playlists } from './playlists';
import { Album } from './album';
import { Artist } from './artist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = environment.spotify.clientId;
  private clientSecret: string = environment.spotify.clientSecret;

  private accessToken: string;
  public authorized = false;

  constructor(
    private http: HttpClient
  ) {}

  getAuth(): Observable<Auth> {
    const options = {
      headers: new HttpHeaders(
        {
          Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
          'Content-type': 'application/x-www-form-urlencoded'
        }
      )
    };
    const body = new HttpParams().set('grant_type', 'client_credentials');
    return this.http.post<Auth>('https://accounts.spotify.com/api/token', body, options).pipe(
      tap(res => {
        this.accessToken = res.access_token;
        this.authorized = true;
      }),
      catchError(this.handleError<Auth>(`Auth Failed`))
    );
  }

  checkAuth(): Observable<Auth> {
    if (this.accessToken) {
      return of({ access_token: this.accessToken });
    }

    return this.getAuth();
  }

  private getAuthOption() {
    return {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.accessToken}`
        }
      )
    };
  }

  getNewRelease(): Observable<Albums> {
    return this.http.get<Albums>('https://api.spotify.com/v1/browse/new-releases', this.getAuthOption())
      .pipe(
        catchError(this.handleError<Albums>(`Get New Release Failed`))
      );
  }

  getFeaturePlaylist(): Observable<Playlists> {
    return this.http.get<Playlists>('https://api.spotify.com/v1/browse/featured-playlists', this.getAuthOption())
      .pipe(
        catchError(this.handleError<Playlists>(`Get Feature Playlists Failed`))
      );
  }

  searchArtists(word: string): Observable<Artists> {
    const params: HttpParams = new HttpParams().set('q', word).set('type', 'artist').set('market', 'JP');
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Artists>('https://api.spotify.com/v1/search', {headers, params})
      .pipe(
        catchError(this.handleError<Artists>(`Search Artists Failed`))
      );
  }

  searchAlbums(word: string): Observable<Albums> {
    const params: HttpParams = new HttpParams().set('q', word).set('type', 'album').set('market', 'JP');
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Albums>('https://api.spotify.com/v1/search', {headers, params})
      .pipe(
        catchError(this.handleError<Albums>(`Search Albums Failed`))
      );
  }

  getAlbum(id: string): Observable<Album> {
    const params: HttpParams = new HttpParams().set('market', 'JP');
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Album>(`https://api.spotify.com/v1/albums/${id}`, {headers, params})
      .pipe(
        catchError(this.handleError<Album>(`Get Album Failed`))
      );
  }

  getArtist(id: string): Observable<Artist> {
    const params: HttpParams = new HttpParams().set('market', 'JP');
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Artist>(`https://api.spotify.com/v1/artists/${id}`, {headers, params})
      .pipe(
        catchError(this.handleError<Artist>(`Get Album Failed`))
      );
  }

  // TODO: 全体で共通化する
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.log(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
