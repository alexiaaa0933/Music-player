import { Component, OnInit } from '@angular/core';
import { Song } from '../../Interfaces/Song';
import { SongsServiceService } from '../../services/songs-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.scss'
})
export class AlbumPageComponent implements OnInit {
  songList:Song[]=[];
 
  selectedAlbum:Song|null=null;
  constructor(private songService: SongsServiceService, private router: Router) { }
  ngOnInit(): void {
    this.songService.selectedAlbumO.subscribe(album=>this.selectedAlbum=album)
    console.log(this.selectedAlbum);
    if (this.selectedAlbum?.album) {
      this.songService.getSongsByAlbum(this.selectedAlbum.album).subscribe(x => this.songList = x);
    }
    console.log(this.songList);
  }
getFormattedDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

}
