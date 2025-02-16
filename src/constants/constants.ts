export const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth"
    : "https://valse.vercel.app/auth";

export const SPOTIFY_BASE_URL = "https://api.spotify.com";

export const PAGES = {
  dashboard: "/dashboard",
  playlist: (id: string) => `/dashboard/p/${id}`,

  auth: "/auth",
};

export const ENDPOINTS = {
  get_playlists: SPOTIFY_BASE_URL + "/v1/me/playlists",
  get_playlist_items: (id: string) =>
    SPOTIFY_BASE_URL + `/v1/playlists/${id}/tracks`,
  get_user_profile: SPOTIFY_BASE_URL + "/v1/me",
};
