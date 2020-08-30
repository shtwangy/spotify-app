import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.spotifyService.checkAuth()
      .pipe(
        tap(res => {
          if ( !res ) {
            // TODO: 404ページとかに遷移
            window.location.href = 'https://www.spotify.com/jp/';
          }
        })
      );
  }
}
