import { Component, OnInit, ViewChild } from '@angular/core';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';

import { AudioPlayerComponent } from '../audio-player/audio-player.component';

import { Router } from '@angular/router';




@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss']
})

export class DisplayListComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayerComponent!: AudioPlayerComponent;





  songList: Song[] = [];
  currentSong!: Song;

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
    }}

  constructor(private songService: SongsServiceService, private router: Router) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(x => this.songList = x);
    console.log(this.songList);

    //   this.songList = [
    //   {
    //     songName: 'Blinding Lights',
    //     author: 'The Weeknd',
    //     album: 'After Hours',
    //     creationDate: new Date('2019-11-29'),
    //     duration: 200,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Shape of You',
    //     author: 'Ed Sheeran',
    //     album: 'Divide',
    //     creationDate: new Date('2017-01-06'),
    //     duration: 233,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Dance Monkey',
    //     author: 'Tones and I',
    //     album: 'The Kids Are Coming',
    //     creationDate: new Date('2019-05-10'),
    //     duration: 209,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Someone You Loved',
    //     author: 'Lewis Capaldi',
    //     album: 'Divinely Uninspired To A Hellish Extent',
    //     creationDate: new Date('2018-11-08'),
    //     duration: 182,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Rockstar',
    //     author: 'Post Malone ft. 21 Savage',
    //     album: 'Beerbongs & Bentleys',
    //     creationDate: new Date('2017-09-15'),
    //     duration: 218,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Sunflower',
    //     author: 'Post Malone & Swae Lee',
    //     album: 'Spider-Man: Into the Spider-Verse',
    //     creationDate: new Date('2018-10-18'),
    //     duration: 158,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Señorita',
    //     author: 'Shawn Mendes & Camila Cabello',
    //     album: 'Romance',
    //     creationDate: new Date('2019-06-21'),
    //     duration: 191,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'One Dance',
    //     author: 'Drake ft. Wizkid & Kyla',
    //     album: 'Views',
    //     creationDate: new Date('2016-04-05'),
    //     duration: 173,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Circles',
    //     author: 'Post Malone',
    //     album: 'Hollywood\'s Bleeding',
    //     creationDate: new Date('2019-08-30'),
    //     duration: 215,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Closer',
    //     author: 'The Chainsmokers ft. Halsey',
    //     album: 'Collage',
    //     creationDate: new Date('2016-07-29'),
    //     duration: 244,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Believer',
    //     author: 'Imagine Dragons',
    //     album: 'Evolve',
    //     creationDate: new Date('2017-02-01'),
    //     duration: 204,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Don\'t Start Now',
    //     author: 'Dua Lipa',
    //     album: 'Future Nostalgia',
    //     creationDate: new Date('2019-11-01'),
    //     duration: 183,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Havana',
    //     author: 'Camila Cabello ft. Young Thug',
    //     album: 'Camila',
    //     creationDate: new Date('2017-08-03'),
    //     duration: 217,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'Perfect',
    //     author: 'Ed Sheeran',
    //     album: 'Divide',
    //     creationDate: new Date('2017-03-03'),
    //     duration: 263,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   },
    //   {
    //     songName: 'bad guy',
    //     author: 'Billie Eilish',
    //     album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
    //     creationDate: new Date('2019-03-29'),
    //     duration: 194,
    //     imageUrl: 'https://i.pinimg.com/564x/94/fe/aa/94feaab7c012474e771e8b281a234a1d.jpg'
    //   }
    // ];

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
    });}

  onAlbumClick(song: Song): void {

    this.router.navigate(['/album', song.album]);
    this.songService.getSelectedAlbum(song);
  }
  onArtistClick(song: Song): void {
    this.router.navigate(['/artist', song.author]);

  }
}
