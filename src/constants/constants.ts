export const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth"
    : "https://valse.vercel.app/auth";

export const SPOTIFY_BASE_URL = "https://api.spotify.com";

export const PAGES = {
  dashboard: "/dashboard",
  top_tracks: "/dashboard/top/tracks",
  top_artists: "/dashboard/top/artists",
  stats: "/dashboard/stats",

  auth: "/auth",
};

export const ENDPOINTS = {
  get_currently_playing: SPOTIFY_BASE_URL + "/v1/me/player/currently-playing",
  get_recently_played: SPOTIFY_BASE_URL + "/v1/me/player/recently-played",
  get_top_items: (i: "artists" | "tracks") =>
    SPOTIFY_BASE_URL + `/v1/me/top/${i}`,
};
