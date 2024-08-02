# Music Player Project

## Overview
The Music Player Project is an Angular application designed to interact with a .NET API for listing and streaming local `.mp3` files stored on a server. The application offers a user-friendly interface for browsing and playing music files, alongside additional functionalities to enhance the user experience.

## Objective
To create an application that provides a seamless music playback experience, featuring a list of available songs, an audio player, playlist management, and more.

## Technical Specifications

### Backend: .NET API
1. **API Endpoint to List Files:**
   - Returns a JSON array of available `.mp3` files.
   - Each entry includes:
     - `FileName`: The name of the file.
     - `Metadata`: The creation date, album name, rating, and author.
       
2. **API Endpoint to Stream File:**
   - Streams the specified `.mp3` file.
   - Supports range requests for efficient streaming and seeking within the file.


  ![image](https://github.com/user-attachments/assets/75f8820d-d613-47e9-b1b3-3f6ead689b6f)

  ![image](https://github.com/user-attachments/assets/99233442-3f78-47fd-a97d-19e9a481c2f4)


### Frontend: Angular Application

#### Key Features

1. **Display List of Available Songs:**
   - Presents each file name and metadata in a readable list.
   - Ensures easy navigation.

2. **Audio Player:**
   - Appears when a song is selected.
   - Controls include:
     - Play/Pause
     - Next/Previous track
     - Seek bar for navigation
     - Duration display for elapsed and total time
   - Uses the stream URL from `/api/music/stream/{fileName}`.

3. **Interaction:**
   - Clicking a song starts playback.
   - Provides smooth transitions for play, pause, and seeking actions.
  
![image](https://github.com/user-attachments/assets/6de1be44-6803-4b2a-8051-c81be9be085b)


#### UI/UX
- Clean and intuitive interface.
- Prominently displays the audio player.
- Provides visual feedback (e.g., highlighting, buffering status).

## Additional Functionalities

### Responsive Design
- Ensures compatibility across desktop, tablet, and mobile devices.

### Error Handling
- Displays user-friendly error messages.
- Offers options to retry or return to the song list.

### Performance
- Optimized for minimal loading times and smooth playback.
- Efficient data fetching and state management.

### User Registration
- Users can create an account or sign in.

![Screenshot 2024-08-02 125731](https://github.com/user-attachments/assets/bfb753a2-c814-4b41-a071-55c4dbff7d48)

![Screenshot 2024-08-02 125742](https://github.com/user-attachments/assets/16598ba8-a905-4179-ab35-7e0a83726ffd)


### Playlist Management
- Users can create and manage playlists.
- Allows adding and removing songs.

![image](https://github.com/user-attachments/assets/ab0d199d-6e11-45dd-8444-1e54342c0f30)
  *we can add a song to the playlist using the "+" button or remove it using "-"

![image](https://github.com/user-attachments/assets/50c9b74f-4215-4d4e-9b56-b3e7e3b05636)


### Search Bar
- Provides a way to search for your favorite song title.

![image](https://github.com/user-attachments/assets/c89eb711-b82d-45d8-9001-89efea6fdd28)


  
### Shuffle Songs
- Provides a shuffle option for random playback.

## Bonus Features
- **Album Image**: Display album artwork for each song.
- **Detailed Views**:
  - Song or album names redirect to pages showing songs from the same album.
  - Artist names redirect to a page with the artist's top 5 rated songs and their albums.
 
    ![image](https://github.com/user-attachments/assets/40221260-2230-4838-b375-71e6811d54b9)

    ![image](https://github.com/user-attachments/assets/31e54a68-a3f6-43c4-aa28-47c034fced56)


## Conclusion
This Music Player Project documentation outlines the core requirements and additional features that have been implemented. The project offers a comprehensive music playback solution, focusing on user experience and functionality.
