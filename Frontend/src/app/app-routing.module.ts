import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { DisplayListComponent } from './components/display-list/display-list.component';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { ArtistTop5Component } from './components/artist-top-5/artist-top-5.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'player/:fileName', component: AudioPlayerComponent },
{
  path:"display-list/:email",
  component: DisplayListComponent
},
{
  path:"album/:name",
  component: AlbumPageComponent
},
{
  path:"artist/:name",
  component: ArtistTop5Component
},
{
  path:"register",
  component: RegisterComponent
},
{
  path:"logIn",
  component:LoginComponent
},
{
  path: "",
  component: LoginComponent
},
{
  path: '**',
  component: LoginComponent,
  pathMatch: 'full'
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
