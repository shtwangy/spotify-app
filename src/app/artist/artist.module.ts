import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule } from '@angular/material';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

@NgModule({
  declarations: [ArtistDetailComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ArtistModule { }
