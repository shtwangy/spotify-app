import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Auth } from '../../share/auth';
import { NewReleaseItems } from './new-release-items';
import {Playlists} from './playlists';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId: string = environment.spotify.clientId;
  private clientSecret: string = environment.spotify.clientSecret;

  private accessToken: string;

  constructor(
    private http: HttpClient
  ) { }

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
      tap(res => this.accessToken = res.access_token),
      catchError(this.handleError<Auth>(`Auth Failed`))
    );
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

  getNewRelease(): Observable<NewReleaseItems> {
    return this.http.get<NewReleaseItems>('https://api.spotify.com/v1/browse/new-releases', this.getAuthOption())
      .pipe(
        catchError(this.handleError<NewReleaseItems>(`Get New Release Failed`))
      );
  }

  getFeaturePlaylist(): Observable<Playlists> {
    return this.http.get<Playlists>('https://api.spotify.com/v1/browse/featured-playlists', this.getAuthOption())
      .pipe(
        catchError(this.handleError<Playlists>(`Get Feature Playlists Failed`))
      );
  }

  // TODO: 全体で共通化する
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error);
      return of(result as T);
    };
  }
}
