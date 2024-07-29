import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../../services/login-service.service';

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
  artists: string[] = [];
  filteredItems: Song[] = [];
  searchTerm: string = '';
  addSongInPlaylistIcon: string = 'add_circle';
  removeSongFromPlaylistIcon: string = 'remove_circle_outline';
  unlikedIcon: string = 'favorite_border';
  likedIcon: string = 'favorite';

  constructor(private songService: SongsServiceService, private router: Router, private activatedRoute: ActivatedRoute, private logInService: LoginServiceService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(
      songs => {
        this.songList = songs;
        this.filteredItems = this.songList;
        
        this.initializeLikes();
        this.initializePlaylistButtons();
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

  getNextSong(): Song {
    const index = this.filteredItems.indexOf(this.currentSong) + 1;
    if (index === this.filteredItems.length)
      return this.filteredItems[0];
    return this.filteredItems[index];
  }

  getPreviousSong(): Song {
    const index = this.filteredItems.indexOf(this.currentSong) - 1;
    if (index === -1)
      return this.filteredItems[this.filteredItems.length - 1];
    return this.filteredItems[index];
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
        this.logInService.updateSongInUserPlaylist(currentEmail, updatedSong).subscribe(
          () => {
            console.log('Song updated in user playlist successfully');
          },
          updateError => {
            console.error('Error updating song in user playlist', updateError);
          }
        );     
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

  onArtistClick(artist:string): void {
    this.router.navigate(['/artist', artist]);
    this.songService.getSelectedArtist(artist);
    console.log(artist);
  }
  splitArtist(authors:string):string[]{
    return this.songService.splitArtistAndFt(authors);
  }
  onPlayListClick(){
    const currentEmail = this.activatedRoute.snapshot.paramMap.get('email');
    if (!currentEmail) {
      console.error('Current email not found in route parameters');
      return;
    }
    this.router.navigate(['/playlist', currentEmail]);
    // this.logInService.getSongs(currentEmail);
  }

  initializeLikes() {
    const currentEmail = this.activatedRoute.snapshot.paramMap.get('email');
    if (currentEmail) {
      this.songList.forEach(song => {
        song.isLiked = song.usersWhoLiked.includes(currentEmail);
      });
    }
  }
    
  initializePlaylistButtons() {
    const currentEmail = this.activatedRoute.snapshot.paramMap.get('email');
  
    if (!currentEmail) {
      console.error('Current email not found in route parameters');
      return;
    }
  
    this.logInService.getSongs(currentEmail).subscribe(
      userSongs => {
        this.songList.forEach(song => {
          const isInPlaylist = userSongs.some(userSong => userSong.fileName === song.fileName);
          song.isAddedToPlaylist = isInPlaylist;
        });
      },
      error => {
        this.errorMessage = error.error?.message || 'Error retrieving songs';
      }
    );
  }
  

  getImageUrl(song: Song): string {
    return song.isLiked ? this.likedIcon : this.unlikedIcon;
  }

  addSongToUserPlaylist(newSong: Song): void {
    const currentEmail = this.activatedRoute.snapshot.paramMap.get('email');

    if (!currentEmail) {
      console.error('Current email not found in route parameters');
      return;
    }

    newSong.isAddedToPlaylist = !newSong.isAddedToPlaylist;
    this.updateSongInLists(newSong);

    this.logInService.addSongToUserPlaylist(currentEmail, newSong).subscribe(
      (response) => {
        console.log('Song added to playlist successfully', response);
      },
      (error) => {
        console.error('Error adding song to playlist', error);
      }
    );
  }

  getPlaylistButtonIcon(song: Song): string {
    return song.isAddedToPlaylist ? this.removeSongFromPlaylistIcon : this.addSongInPlaylistIcon;
  }

}
