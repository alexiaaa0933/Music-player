import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  buttonPlay: boolean = true;
  duration: number = 60;
  durationToDisplay: string = '';
  valueToDisplay: string = '';
  min: number = 0;
  value: number = 0;
  start: number = 0;
  interval: any;

  onPlay(): void {
    this.buttonPlay = !this.buttonPlay;
    console.log(this.durationToDisplay)
    var timeDiff = this.duration - this.start;
    this.durationToDisplay = this.durationToString(this.duration);
    timeDiff /= 1000;

    if (!this.buttonPlay) {
      console.log(this.value);
      this.interval = setInterval(() => {
        this.value = parseFloat((this.value + 1).toFixed(1));
        this.valueToDisplay = this.durationToString(this.value);
        if (this.value >= this.duration) {
          this.value = this.duration;
          this.valueToDisplay = this.durationToString(this.value);
          this.stop();

        }
      }, 1000);
    }

  }
  stop(): void {
    if (this.interval) {
      console.log(this.value);
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  onInputChange(event: any): void {
    this.value = event.value;
    console.log(this.value);
  }

  durationToString(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  }
}
