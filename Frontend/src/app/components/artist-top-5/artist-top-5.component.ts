import { Component, OnInit, ViewChild } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-top-5',
  templateUrl: './artist-top-5.component.html',
  styleUrl: './artist-top-5.component.scss'
})
export class ArtistTop5Component implements OnInit {
  @ViewChild('audioPlayer') audioPlayerComponent!: AudioPlayerComponent;
artistSongs: Song[] = [];
  
currentSong!: Song;
selectedArtist: Song | null = null;


playAlbum():void {
  if(this.artistSongs.length>0)
  {
    this.playSong(this.artistSongs[0]);
  }
  }

playSong(song: Song): void {
  this.currentSong = song;
  this.audioPlayerComponent.currentSong = song;
  this.audioPlayerComponent.loadSong(song.fileName);
}

onSongChanged(song: Song): void {
  this.currentSong = song;
}

getNextSong(): Song | null {
  const index = this.artistSongs.indexOf(this.currentSong) + 1;
  return index < this.artistSongs.length ? this.artistSongs[index] : null;
}

getPreviousSong(): Song | null {
  const index = this.artistSongs.indexOf(this.currentSong) - 1;
  return index >= 0 ? this.artistSongs[index] : null;
}

onNextSongRequested(): void {
  const nextSong = this.getNextSong();
  if (nextSong) {
    this.playSong(nextSong);
  }
}

onPreviousSongRequested(): void {
  const previousSong = this.getPreviousSong();
  if (previousSong) {
    this.playSong(previousSong);
  }}
constructor(private songService: SongsServiceService, private router: Router) { }

ngOnInit(): void {
  this.songService.selectedArtistO.subscribe(artist => this.selectedArtist = artist)

  if (this.selectedArtist?.author) {
    this.songService.getSongsByAuthor(this.selectedArtist.author).subscribe(x => this.artistSongs = x);
  }

 
}


getFormattedDuration(duration: number):string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
}
