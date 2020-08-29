import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [SearchResultComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class SearchModule { }
