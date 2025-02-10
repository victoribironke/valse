export type RecentlyPlayedTrack = {
  title: string;
  artists: string[];
  is_local: boolean;
  album: string;
  duration: string;
  played_at: string;
  album_cover_src: string;
};

export type TopTrack = {
  pos: number;
  image_src: string;
  title: string;
  artist: string;
};

export type TopArtist = {
  pos: number;
  image_src: string;
  artist: string;
};
