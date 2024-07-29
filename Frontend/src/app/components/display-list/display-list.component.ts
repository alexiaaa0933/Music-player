import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})
export class DisplayListComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayerComponent!: AudioPlayerComponent;

  songList: Song[] = [];
  currentSong!: Song;
  errorMessage: string | null = null;
  filteredItems: Song[] = [];
  searchTerm: string = '';
  // unlikedImageUrl: string = 'https://logowik.com/content/uploads/images/like-heart2255.logowik.com.webp';
  // likedImageUrl: string = 'https://cdn.vectorstock.com/i/500p/58/88/flat-heart-icon-vector-30695888.jpg';
  unlikedImageUrl: string = '♡';
  likedImageUrl: string = '♥';

  constructor(private songService: SongsServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(
      songs => {
        this.songList = songs;
        this.filteredItems = this.songList;
        this.initializeLikes();
      },
      error => {
        this.errorMessage = error.error?.message;
      }
    );
  }

  onSearch() {
    this.filteredItems = this.songList.filter(item =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
    const index = this.filteredItems.indexOf(this.currentSong) + 1;
    return index < this.filteredItems.length ? this.filteredItems[index] : null;
  }

  getPreviousSong(): Song | null {
    const index = this.filteredItems.indexOf(this.currentSong) - 1;
    return index >= 0 ? this.filteredItems[index] : null;
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

    const currentEmail = this.activatedRoute.snapshot.paramMap.get('email');
    if (!currentEmail) {
        console.error('Current email not found in route parameters');
        return;
    }

    const originalIsLiked = song.isLiked;

    song.isLiked = !song.isLiked;
    this.updateSongInLists(song);

    this.songService.likeSong(song.fileName, currentEmail).subscribe(
        updatedSong => {
          updatedSong.isLiked = song.isLiked;
            this.updateSongInLists(updatedSong);
        },
        error => {
            console.error('Error liking song', error);
            song.isLiked = originalIsLiked;
            this.updateSongInLists(song);
        }
    );
  }

  updateSongInLists(updatedSong: Song): void {
    const songIndex = this.songList.findIndex(s => s.fileName === updatedSong.fileName);
    if (songIndex !== -1) {
      this.songList[songIndex] = updatedSong;
    }
    
    const filteredIndex = this.filteredItems.findIndex(s => s.fileName === updatedSong.fileName);
    if (filteredIndex !== -1) {
      this.filteredItems[filteredIndex] = updatedSong;
    }
  }

  onAlbumClick(song: Song): void {
    this.router.navigate(['/album', song.album]);
    this.songService.getSelectedAlbum(song);
  }

  onArtistClick(song: Song): void {
    this.router.navigate(['/artist', song.author]);
  }

  initializeLikes() {
    const currentEmail = this.activatedRoute.snapshot.paramMap.get('email');
    if (currentEmail) {
      this.songList.forEach(song => {
        song.isLiked = song.usersWhoLiked.includes(currentEmail);
      });
    }
  }
    this.songService.getSelectedArtist(song);


  getImageUrl(song: Song): string {
    return song.isLiked ? this.likedImageUrl : this.unlikedImageUrl;
  }
}
