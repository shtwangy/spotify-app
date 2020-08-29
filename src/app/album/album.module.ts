import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

@NgModule({
  declarations: [AlbumDetailComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AlbumModule { }
