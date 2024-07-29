import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { Router } from '@angular/router';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss'
})
export class AlbumPageComponent implements OnInit {

  @ViewChild('audioPlayer') audioPlayerComponent!: AudioPlayerComponent;
  albumSongs: Song[] = [];
  

  
  currentSong!: Song;
  selectedAlbum: Song | null = null;
  albumDisplay: string = '';
  releaseYear: number = 0;

  playAlbum():void {
    if(this.albumSongs.length>0)
    {
      this.playSong(this.albumSongs[0]);
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
    const index = this.albumSongs.indexOf(this.currentSong) + 1;
    return index < this.albumSongs.length ? this.albumSongs[index] : null;
  }

  getPreviousSong(): Song | null {
    const index = this.albumSongs.indexOf(this.currentSong) - 1;
    return index >= 0 ? this.albumSongs[index] : null;
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
    this.songService.selectedAlbumO.subscribe(album => this.selectedAlbum = album)

    if (this.selectedAlbum?.album) {
      this.songService.getSongsByAlbum(this.selectedAlbum.album).subscribe(x => this.albumSongs = x);
    }

    this.albumDisplay = this.selectedAlbum?.album ?? '';
    this.albumDisplay = this.albumDisplay.toUpperCase();
    if (this.selectedAlbum?.creationDate) {
      var date = new Date(this.selectedAlbum.creationDate);
      this.releaseYear = date.getFullYear();
    }
    console.log(this.releaseYear);
  }
 
  getAllDuration():string
  {
    let totalDuration = 0;
    this.albumSongs.forEach(song => totalDuration += song.duration);
    let totalDurationFormat= this.getFormattedDuration(totalDuration);
    let minutes=parseInt(totalDurationFormat.split(":")[0]);
    let seconds=parseInt(totalDurationFormat.split(":")[1]);
    
    return `${minutes} minutes and ${seconds} seconds`;
  }
 
  getFormattedDuration(duration: number):string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
 
  
}
