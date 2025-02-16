export type Playlist = {
  title: string;
  playlist_id: string;
  snapshot_id: string;
  image_src: string | null;
};

export type User = {
  country: string;
  display_name: string;
  email: string;
  followers: number;
  profile_pic: string;
  user_id: string;
  credits: number;
};

export type Track = {
  title: string;
  artist: string;
  album: string;
  duration: number;
  image_src: string;
  is_local: boolean;
};
