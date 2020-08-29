import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumDetailComponent } from './album-detail/album-detail.component';


const routes: Routes = [
  {
    path: 'detail/:id',
    component: AlbumDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
