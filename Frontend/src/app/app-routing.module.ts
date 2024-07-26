import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { DisplayListComponent } from './components/display-list/display-list.component';

const routes: Routes = [
  { path: 'player/:fileName', component: AudioPlayerComponent },
{
  path:"display-list",
  component:DisplayListComponent
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
