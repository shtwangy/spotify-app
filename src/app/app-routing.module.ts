import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifyAuthGuard } from './core/guard/spotify-auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule),
    canActivate: [SpotifyAuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchModule),
    canActivate: [SpotifyAuthGuard]
  },
  {
    path: 'album',
    loadChildren: () => import('./album/album.module').then( m => m.AlbumModule),
    canActivate: [SpotifyAuthGuard]
  },
  {
    path: 'artist',
    loadChildren: () => import('./artist/artist.module').then( m => m.ArtistModule),
    canActivate: [SpotifyAuthGuard]
  },
  {
    path: 'playlist',
    loadChildren: () => import('./playlist/playlist.module').then( m => m.PlaylistModule),
    canActivate: [SpotifyAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
