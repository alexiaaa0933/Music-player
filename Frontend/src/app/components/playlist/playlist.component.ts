import { Component, ViewChild } from '@angular/core';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  @ViewChild('audioPlayer') audioPlayerComponent!: AudioPlayerComponent;
  albumSongs: Song[] = [];
  

  
  currentSong!: Song;
  selectedAlbum: Song | null = null;
  albumDisplay: string = '';
  releaseYear: number = 0;
  currentUser: User | undefined;

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
  constructor(private songService: SongsServiceService, private router: Router, private loginService: LoginServiceService,private activatedRoute: ActivatedRoute) { }
 
  ngOnInit(): void {
    const currentEmail = this.activatedRoute.snapshot.paramMap.get('name');
    if (!currentEmail) {
      console.error('Current email not found in route parameters');
      return;
    }

    this.loginService.getUserByEmail(currentEmail).subscribe(x => this.currentUser = x);
    this.loginService.getSongs(currentEmail).subscribe(x => this.albumSongs = x);
    
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
