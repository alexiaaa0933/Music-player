export interface Song
{
  title: string,
  author: string,
  album: string,
  creationDate: Date,
  duration: number,
  imageURL: string,
  fileName: string;
  likes: number,
  usersWhoLiked: string[],
  isLiked: boolean,
  isAddedToPlaylist: boolean;
}