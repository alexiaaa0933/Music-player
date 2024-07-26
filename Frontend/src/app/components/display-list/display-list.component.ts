import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class DisplayListComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayerComponent!: AudioPlayerComponent;

  songList: Song[] = [];
  currentSong!: Song;

  constructor(private songService: SongsServiceService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(x => this.songList = x);
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
    const index = this.songList.indexOf(this.currentSong) + 1;
    return index < this.songList.length ? this.songList[index] : null;
  }

  getPreviousSong(): Song | null {
    const index = this.songList.indexOf(this.currentSong) - 1;
    return index >= 0 ? this.songList[index] : null;
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
    }
  }

  getFormattedDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  onLikeSong(song: Song, event: Event): void {
    event.stopPropagation();

    this.songService.likeSong(song.fileName).subscribe(updatedSong => {
      const index = this.songList.findIndex(s => s.fileName === song.fileName);
      if (index !== -1) {
        this.songList[index] = updatedSong;
      }
    }, error => {
      console.error('Error liking song', error);
    });
  }
}
