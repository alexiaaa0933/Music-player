import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SongsServiceService } from '../../services/songs-service.service';
import { Song } from '../../Interfaces/Song';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  @Output() songChanged: EventEmitter<Song> = new EventEmitter();
  @Output() requestNextSong: EventEmitter<void> = new EventEmitter();
  @Output() requestPreviousSong: EventEmitter<void> = new EventEmitter();
  
  @Input() currentSong!: Song;
  @Input() listOfSongs!:Song[];

  buttonPlay: boolean = true;
  duration: number = 60;
  durationToDisplay: string = '';
  valueToDisplay: string = '';
  min: number = 0;
  value: number = 0;
  interval: any;
  audio = new Audio();
  volume: number = 1; 


  constructor(private songService: SongsServiceService) { }

  ngOnInit(): void {}

  loadSong(fileName: string): void {
    this.buttonPlay = false;
    this.songService.getSongStream(fileName).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      this.audio.src = url;
      this.audio.load();
      this.audio.play();
      this.audio.onloadedmetadata = () => {
        this.duration = this.audio.duration;
        this.min = 0;
        this.durationToDisplay = this.durationToString(this.duration);
      };
      this.audio.ontimeupdate = () => {
        this.value = this.audio.currentTime;
        this.valueToDisplay = this.durationToString(this.value);
      };
    }, error => {
      console.error('Error loading song', error);
    });
  }

  onPlay(): void {
    if (this.buttonPlay) {
      this.audio.play();
      this.buttonPlay = false;
      this.startUpdatingSlider();
    } else {
      this.audio.pause();
      this.buttonPlay = true;
      this.stopUpdatingSlider();
    }
  }

  private startUpdatingSlider(): void {
    this.interval = setInterval(() => {
      this.value = this.audio.currentTime;
      this.valueToDisplay = this.durationToString(this.value);

      if (this.audio.ended) {
        this.stop();
        this.playNextSong();
      }
    }, 1000);
  }

  private stopUpdatingSlider(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onStop(): void {
    this.stop();
    this.buttonPlay = true;
    this.audio.pause();
  }

  onInputChange(event: any): void {
    this.audio.currentTime = this.value;
  }

  durationToString(duration: number): string {
    const roundedDuration = Math.round(duration);
    const minutes = Math.floor(roundedDuration / 60);
    const seconds = roundedDuration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  playNextSong(): void {
    this.requestNextSong.emit();
  }

  playPreviousSong(): void {
    this.requestPreviousSong.emit();
  }

  shuffleSongs(): void {
    console.log(this.listOfSongs);
    let currentIndex = this.listOfSongs.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.listOfSongs[currentIndex], this.listOfSongs[randomIndex]] = [this.listOfSongs[randomIndex], this.listOfSongs[currentIndex]];
    }
    console.log(this.listOfSongs);
    if (this.listOfSongs.length > 0) {
      this.playNextSong();
    }
  }
  onVolumeChange(event: any): void {
    this.audio.volume = this.volume;
  }
  
}
