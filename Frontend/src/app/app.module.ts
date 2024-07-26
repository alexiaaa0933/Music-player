import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayListComponent } from './components/display-list/display-list.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import{MatSliderModule} from '@angular/material/slider';
import{MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { AlbumPageComponent } from './components/album-page/album-page.component';
import { ArtistTop5Component } from './components/artist-top-5/artist-top-5.component';

@NgModule({
  declarations: 
  [
    AppComponent,
    DisplayListComponent,
    AudioPlayerComponent,
    AlbumPageComponent,
    ArtistTop5Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSliderModule,
    MatTooltipModule,
 FormsModule,
 ReactiveFormsModule,
 HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
