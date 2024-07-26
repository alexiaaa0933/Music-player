import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { DisplayListComponent } from './components/display-list/display-list.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { ArtistTop5Component } from './components/artist-top-5/artist-top-5.component';

const routes: Routes = [
  { path: 'player/:fileName', component: AudioPlayerComponent },
{
  path:"display-list",
  component:DisplayListComponent
},
{
  path:"album/:name",
  component:AlbumPageComponent
},
{
  path:"artist/:name",
  component:ArtistTop5Component
},
{
  path: "",
  component: DisplayListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
