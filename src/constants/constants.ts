export const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth"
    : "https://valse.vercel.app/auth";

export const SPOTIFY_BASE_URL = "https://api.spotify.com";

export const PAGES = {
  dashboard: "/dashboard",
  top: "/dashboard/top",
  stats: "/dashboard/stats",

  auth: "/auth",
};

export const ENDPOINTS = {
  get_currently_playing: SPOTIFY_BASE_URL + "/v1/me/player/currently-playing",
  get_recently_played: SPOTIFY_BASE_URL + "/v1/me/player/recently-played",
};
