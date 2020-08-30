import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';

import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [PlaylistDetailComponent],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PlaylistModule { }
