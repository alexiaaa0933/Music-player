import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../Interfaces/Song';


@Injectable({
  providedIn: 'root'
})
export class SongsServiceService {

  private readonly baseUrl ="https://localhost:7078";
  private selectedAlbumS:BehaviorSubject<Song|null>;
  public selectedAlbumO:Observable<Song|null>

  private selectedArtistS:BehaviorSubject<Song|null>;
  public selectedArtistO:Observable<Song|null>
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient:HttpClient) { 
    this.selectedAlbumS = new BehaviorSubject<Song|null>(null);
    this.selectedAlbumO = this.selectedAlbumS.asObservable();

    this.selectedArtistS=new BehaviorSubject<Song|null>(null);
    this.selectedArtistO=this.selectedArtistS.asObservable();
  }

  getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.baseUrl + "/api/Music/list", this.httpOptions);
  }


  getSongStream(fileName: string): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/api/Music/stream/${fileName}`, {
      ...this.httpOptions,
      responseType: 'blob'
    });
  }

  likeSong(fileName: string): Observable<Song> {
    return this.httpClient.post<Song>(`${this.baseUrl}/api/Music/like/${fileName}`, {}, this.httpOptions);
  }
  
  getSongsByAlbum(album: string): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.baseUrl + "/api/Music/byAlbum/"+album, this.httpOptions);
  }
  getSelectedAlbum(select:Song)
  {
    this.selectedAlbumS.next(select);

  }
  getSongsByAuthor(author:string):Observable<Song[]>
  {
    return this.httpClient.get<Song[]>(this.baseUrl+"/api/Music/byAuthor/"+author,this.httpOptions);
  }
  getSelectedArtist(select:Song)
  {
    this.selectedArtistS.next(select);
  }
}
