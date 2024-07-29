import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Song } from '../Interfaces/Song';
import { P } from '@angular/cdk/keycodes';


@Injectable({
  providedIn: 'root'
})
export class SongsServiceService {

  private readonly baseUrl ="https://localhost:7078";
  private selectedAlbumS:BehaviorSubject<Song|null>;
  public selectedAlbumO:Observable<Song|null>

  private selectedArtistS:BehaviorSubject<string|null>;
  public selectedArtistO:Observable<string|null>;

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient:HttpClient) { 
    this.selectedAlbumS = new BehaviorSubject<Song|null>(null);
    this.selectedAlbumO = this.selectedAlbumS.asObservable();

    this.selectedArtistS=new BehaviorSubject<string|null>(null);
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

  likeSong(fileName: string, userEmail: string): Observable<Song> {
    return this.httpClient.post<Song>(`${this.baseUrl}/api/Music/like/${fileName}`, JSON.stringify(userEmail), this.httpOptions);
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
  getSelectedArtist(select:string)
  {
    
    this.selectedArtistS.next(select);
    
  }
  getTop5Songs(author:string):Observable<Song[]>
  {
    return this.httpClient.get<Song[]>(this.baseUrl+"/api/Music/artist-top-5/"+author,this.httpOptions);
  }
  splitArtistAndFt(artist:string)
  {
    if(artist.includes("featuring"))
    {
      artist=artist.replace("featuring",",");
    }
    if(artist.includes("feat"))
    {
      artist=artist.replace("feat",",");
    }
    if(artist.includes("ft"))
    {
      artist=artist.replace("ft",",");
    }
    if(artist.includes("and")&&artist!=="Tones and I")
    {
      artist=artist.replace("and",",");
    }
    let artists=artist.split(",");
    return artists;
  }
}
